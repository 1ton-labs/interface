import { ethers } from 'ethers';

import { ILoanReader } from "./ILoanReader";
import { NFT_COLLECTION_ADDRESS, LENDING_PROTOCOL_ADDRESS, SECONDS_IN_DAY } from "@/constants";
import { INFTfi__factory, INFTfi, } from "@/contracts/sprout";
import { LoanStartedEventObject } from "@/contracts/sprout/contracts/nftfi/v1/interfaces/INFTfi";
import { getEthChain } from "@/core/utils";
import { provider } from "@/core/wagmi";
import { Bond, Loan } from "@/types";
import firebase from 'firebase';

export class EthLoanReader implements ILoanReader {
  // private readonly nftFiContract: INFTfi;
  // private readonly filterFromBlock = 26280000;

  constructor() {
    const chain = getEthChain();
    // this.nftFiContract = INFTfi__factory.connect(LENDING_PROTOCOL_ADDRESS, provider({ chainId: chain.id }));
  }

  async getLoans(): Promise<Map<string, Loan>> {
    // const filter = this.nftFiContract.filters.LoanStarted();
    // const events = await this.nftFiContract.queryFilter(filter, this.filterFromBlock);

    // events.forEach(event => {
    //   if (event.args.nftCollateralContract === NFT_COLLECTION_ADDRESS) {
    //     result.set(event.args.nftCollateralId.toString(), this.nftFiLoanToLoan(event.args))
    //   }
    // })

    const snapshot = await firebase.database().ref("/loans").once("value");
    const loans = snapshot.val();
    const result = new Map<string, Loan>();
    if (loans) {
      for (const [key, value] of Object.entries(loans)) {
        result.set(key, value as Loan);  // TODO: check the values
      }
    }
    return result;
  }

  async getLoanByBond(bond: Bond): Promise<Loan | null> {
    // const loan = await this.getLoanByBondFromEvent(bond.loanId);
    // return loan ? this.nftFiLoanToLoan(loan) : null;

    if (bond.tokenId) {
      const snapshot = await firebase.database().ref(`/loans/${bond.tokenId}`).once("value");
      const loan: Loan = snapshot.val();
      return loan;
    }
    return null;
  }

  // private async getLoanByBondFromEvent(loanId: string): Promise<LoanStartedEventObject | null> {
  //   const filter = this.nftFiContract.filters.LoanStarted();
  //   const events = await this.nftFiContract.queryFilter(filter, this.filterFromBlock);
  //   const event = events.find(event => event.args.loanId.toString() === loanId);

  //   return event ? event.args : null;
  // }

  // private nftFiLoanToLoan(loan: LoanStartedEventObject) {
  //   const mappedLoan: Loan = {
  //     principal: Number(ethers.utils.formatEther(loan.loanPrincipalAmount)),
  //     repayment: Number(ethers.utils.formatEther(loan.maximumRepaymentAmount)),
  //     duration: loan.loanDuration.toNumber() / SECONDS_IN_DAY,
  //     start_time: loan.loanStartTime.toNumber(),
  //     borrower: loan.borrower,
  //     lender: loan.lender,
  //   }
  //   return mappedLoan;
  // }

}
