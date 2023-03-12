import type { Signer } from "@wagmi/core";
import { BigNumber, BigNumberish, ethers } from 'ethers';
import firebase from "firebase";

import firebaseHelper from "@/firebaseHelper";
import { Bond, Loan, Offer, Terms } from "@/types";
import { EthLoanReader } from "./EthLoanReader";
import { ILoanManager } from "./ILoanManager";
import { ILoanReader } from "./ILoanReader";
import { LENDING_PROTOCOL_ADDRESS, NFT_COLLECTION_ADDRESS, SECONDS_IN_DAY, WBNB_ADDRESS } from "@/constants";
import { INFTfi__factory, INFTfi, NFT__factory, NFT, WBNB__factory, WBNB } from "@/contracts/sprout";

interface BorrowerOffer {
  nftCollateralId: BigNumberish
  borrowerNonce: BigNumberish
  nftCollateralContract: string
  borrower: string
  chainId: BigNumberish
}

interface LenderOffer {
  loanPrincipalAmount: BigNumberish
  maximumRepaymentAmount: BigNumberish
  nftCollateralId: BigNumberish
  loanDuration: BigNumberish
  loanInterestRateForDurationInBasisPoints: BigNumberish
  adminFeeInBasisPoints: BigNumberish
  lenderNonce: BigNumberish
  nftCollateralContract: string
  loanERC20Denomination: string
  lender: string
  interestIsProRated: boolean
  chainId: BigNumberish
}

type EthTerms = Terms & {
  signature: string;
  nonce: string;
  loanERC20Denomination: string
}

export class EthLoanManager implements ILoanManager {
  private readonly nftContract: NFT;
  private readonly nftFiContract: INFTfi;
  private readonly wbnbContract: WBNB;
  private loanReader: ILoanReader;

  private loanInterestRateForDurationInBasisPoints: bigint = BigInt(1000);
  private adminFeeInBasisPoints: bigint = BigInt(500);

  constructor(private readonly signer: Signer) {
    this.nftContract = NFT__factory.connect(NFT_COLLECTION_ADDRESS, signer);
    this.nftFiContract = INFTfi__factory.connect(LENDING_PROTOCOL_ADDRESS, signer);
    this.wbnbContract = WBNB__factory.connect(WBNB_ADDRESS, signer);
    this.loanReader = new EthLoanReader();

    firebaseHelper.initFirebase();
  }

  async signOffer(offer: Offer): Promise<void> {
    const signerAddress = await this.signer.getAddress();
    if (signerAddress) {
      const nonce = this.getNonce()
      const signature = await this.getSignature("LEND", offer, nonce);
      const terms: EthTerms = {
        signature,
        nonce: nonce.toString(),
        loanERC20Denomination: WBNB_ADDRESS,
        principal: offer.principal,
        repayment: offer.repayment,
        duration: offer.duration,
        expires: offer.expires,
      };
      await firebase.database().ref(`/offers/${offer.tokenId}/${signerAddress}`).update(terms);
    }
  }

  async cancelOffer(offer: Offer): Promise<void> {
    await firebase.database().ref(`/offers/${offer.tokenId}/${offer.signer}`).remove();
  }

  async startLoan(bond: Bond, offer: Offer): Promise<boolean> {
    let success = false;
    const nonce = this.getNonce()
    const signature = await this.getSignature("BORROW", offer, nonce);
    const nftApproveTx = await this.nftContract.approve(LENDING_PROTOCOL_ADDRESS, offer.tokenId);
    await nftApproveTx.wait();

    // Get lender offer information from firebase
    const snapshot = await firebase.database().ref(`/offers/${offer.tokenId}/${offer.signer}`).once("value");
    const lenderOffer = snapshot.val() as EthTerms;

    // const { maxFeePerGas, maxPriorityFeePerGas } = await this.signer.getFeeData();

    const loanTx = await this.nftFiContract.beginLoan(
      ethers.utils.parseEther(lenderOffer.principal),
      ethers.utils.parseEther(lenderOffer.repayment),
      BigInt(bond.tokenId),
      BigInt(Math.floor(Number(lenderOffer.duration) * SECONDS_IN_DAY)),
      this.loanInterestRateForDurationInBasisPoints,
      this.adminFeeInBasisPoints,
      [nonce, BigInt(lenderOffer.nonce)],
      NFT_COLLECTION_ADDRESS,
      lenderOffer.loanERC20Denomination,
      offer.signer,
      signature,
      lenderOffer.signature,
      {
        gasLimit: 3000000,
        // maxFeePerGas: maxFeePerGas || BigNumber.from(0),
        // maxPriorityFeePerGas: maxPriorityFeePerGas || BigNumber.from(0),
      }
    )
    const receipt = await loanTx.wait();
    const loanStartedEvent = receipt.events?.find(event => event.event === 'LoanStarted');
    const loanId = loanStartedEvent?.args![0] as BigNumber;

    const loan: Loan = {
      principal: ethers.utils.parseEther(offer.principal).toString(),
      repayment: ethers.utils.parseEther(offer.repayment).toString(),
      duration: Math.floor(Number(offer.duration) * 86400),
      borrower: await this.signer.getAddress(),
      lender: offer.signer,
      start_time: Math.floor(Date.now() / 1000),
      loan_id: loanId.toString(),
    };
    await firebase.database().ref(`/loans/${offer.tokenId}`).update(loan);
    await firebase.database().ref(`/terms/${offer.tokenId}`).remove();
    await firebase.database().ref(`/offers/${offer.tokenId}/${offer.signer}`).remove();

    success = true
    return success;
  }

  async repay(bond: Bond): Promise<boolean> {
    let success = false;
    const loan = await this.loanReader.getLoanByBond(bond);

    if (loan) {
      const repayTx = await this.nftFiContract.payBackLoan(
        bond.loanId,
        { gasLimit: 3000000 },
      );
      await repayTx.wait();
      await firebase.database().ref(`/loans/${bond.tokenId}`).remove();
      success = true;
    }

    return success;
  }

  async claim(bond: Bond): Promise<boolean> {
    let success = false;
    const loan = await this.loanReader.getLoanByBond(bond);

    if (loan && (loan.start_time + loan.duration) < (new Date().getTime() / 1000)) {
      const liquidateTx = await this.nftFiContract.liquidateOverdueLoan(
        bond.loanId,
        { gasLimit: 3000000 },
      );
      await liquidateTx.wait();
      await firebase.database().ref(`/loans/${bond.tokenId}`).remove();
      success = true;
    }

    return success
  }

  private getNonce(): bigint {
    const nonce = BigInt(new Date().getTime())
    return nonce
  }

  private async getSignature(type: "BORROW" | "LEND", offer: Offer, nonce: bigint): Promise<string> {
    let hash;
    switch (type) {
      case "BORROW":
        const borrowOrder: BorrowerOffer = {
          nftCollateralId: BigInt(offer.tokenId),
          borrowerNonce: nonce,
          nftCollateralContract: NFT_COLLECTION_ADDRESS,
          borrower: await this.signer.getAddress(),
          chainId: BigNumber.from(await this.signer.getChainId()),
        }

        hash = this.generateBorrowerHash(borrowOrder)
        break
      case "LEND":
        const lendOrder: LenderOffer = {
          loanPrincipalAmount: ethers.utils.parseEther(offer.principal),
          maximumRepaymentAmount: ethers.utils.parseEther(offer.repayment),
          nftCollateralId: BigInt(offer.tokenId),
          loanDuration: BigInt(Math.floor(Number(offer.duration) * SECONDS_IN_DAY)),
          loanInterestRateForDurationInBasisPoints: this.loanInterestRateForDurationInBasisPoints,
          adminFeeInBasisPoints: this.adminFeeInBasisPoints,
          lenderNonce: nonce,
          nftCollateralContract: NFT_COLLECTION_ADDRESS,
          loanERC20Denomination: WBNB_ADDRESS,
          lender: await this.signer.getAddress(),
          interestIsProRated: true,
          chainId: BigNumber.from(await this.signer.getChainId()),
        }

        hash = this.generateLenderHash(lendOrder)
        break
      default:
        throw new Error(`(signOrder)type not found: ${type}`)
    }
    return await this.signer.signMessage(hash)
  }

  private generateBorrowerHash({
    nftCollateralId,
    borrowerNonce,
    nftCollateralContract,
    borrower,
    chainId,
  }: BorrowerOffer) {
    const hashToSign = ethers.utils.keccak256(
      ethers.utils.solidityPack(
        ['uint256', 'uint256', 'address', 'address', 'uint256'],
        [nftCollateralId, borrowerNonce, nftCollateralContract, borrower, chainId]
      )
    )
    return ethers.utils.arrayify(hashToSign)
  }

  private generateLenderHash({
    loanPrincipalAmount,
    maximumRepaymentAmount,
    nftCollateralId,
    loanDuration,
    loanInterestRateForDurationInBasisPoints,
    adminFeeInBasisPoints,
    lenderNonce,
    nftCollateralContract,
    loanERC20Denomination,
    lender,
    interestIsProRated,
    chainId,
  }: LenderOffer) {
    const hashToSign = ethers.utils.keccak256(
      ethers.utils.solidityPack(
        [
          'uint256',
          'uint256',
          'uint256',
          'uint256',
          'uint256',
          'uint256',
          'uint256',
          'address',
          'address',
          'address',
          'bool',
          'uint256',
        ],
        [
          loanPrincipalAmount,
          maximumRepaymentAmount,
          nftCollateralId,
          loanDuration,
          loanInterestRateForDurationInBasisPoints,
          adminFeeInBasisPoints,
          lenderNonce,
          nftCollateralContract,
          loanERC20Denomination,
          lender,
          interestIsProRated,
          chainId,
        ]
      )
    )
    return ethers.utils.arrayify(hashToSign)
  }
}