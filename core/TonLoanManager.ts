import firebase from "firebase";
import { TonClient4 } from "ton";
import { Address, Sender } from "ton-core";

import { LENDING_PROTOCOL_ADDRESS, MIN_GAS_FEE } from "@/constants";
import { Lending } from "@/contracts/1ton_Lending";
import firebaseHelper from "@/firebaseHelper";
import { Bond, Loan, Offer, TactContract, Terms } from "@/types";
import { ILoanManager } from "./ILoanManager";
import { ILoanReader } from "./ILoanReader";
import { TonLoanReader } from "./TonLoanReader";
import { safeNano } from "./utils";

export class TonLoanManager implements ILoanManager {

  private client4: TonClient4;
  private lending: TactContract<Lending>;
  private loanReader: ILoanReader;

  constructor(private readonly sender: Sender) {
    this.client4 = new TonClient4({ endpoint: "https://sandbox-v4.tonhubapi.com" });
    this.lending = this.client4.open(Lending.fromAddress(Address.parse(LENDING_PROTOCOL_ADDRESS)));
    this.loanReader = new TonLoanReader();

    firebaseHelper.initFirebase();
  }

  async signOffer(offer: Offer): Promise<void> {
    if (this.sender.address) {
      await this.lending.send(
        this.sender,
        { value: safeNano(offer.principal) + MIN_GAS_FEE },
        {
          $$type: "Deposit",
          amount: safeNano(offer.principal),
        },
      );

      const terms: Terms = {
        principal: offer.principal,
        repayment: offer.repayment,
        duration: offer.duration,
        expires: offer.expires,
      };
      await firebase.database().ref(`/offers/${offer.tokenId}/${this.sender.address}`).update(terms);
    }
  }

  async cancelOffer(offer: Offer): Promise<void> {
    if (this.sender.address) {
      await this.lending.send(
        this.sender,
        { value: MIN_GAS_FEE },
        {
          $$type: "Withdraw",
          amount: safeNano(offer.principal),
          receiver: this.sender.address,
        },
      );

      await firebase.database().ref(`/offers/${offer.tokenId}/${offer.signer}`).remove();
    }
  }

  async startLoan(bond: Bond, offer: Offer): Promise<boolean> {
    location.reload();
    let success = false;
    await this.lending.send(
      this.sender,
      { value: MIN_GAS_FEE },
      {
        $$type: "StartLoan",
        investor: Address.parse(offer.signer),
        item: Address.parse(bond.tokenId),
        amount: safeNano(offer.principal),
        repay_amount: safeNano(offer.repayment),
        duration: BigInt(parseInt(offer.duration) * 86400),
      }
    );

    const loan: Loan = {
      loan_id: "",  // TODO: 
      principal: safeNano(offer.principal).toString(),
      repayment: safeNano(offer.repayment).toString(),
      duration: parseInt(offer.duration) * 86400,
      borrower: this.sender.address?.toString() ?? "",
      lender: offer.signer,
      start_time: Math.floor(Date.now() / 1000),
    };
    await firebase.database().ref(`/loans/${offer.tokenId}`).update(loan);
    await firebase.database().ref(`/terms/${offer.tokenId}`).remove();
    await firebase.database().ref(`/offers/${offer.tokenId}/${offer.signer}`).remove();
    success = true;
    return success
  }

  async repay(bond: Bond): Promise<boolean> {
    let success = false
    const loan = await this.loanReader.getLoanByBond(bond);
    if (loan) {
      await this.lending.send(
        this.sender,
        { value: BigInt(loan.repayment) + MIN_GAS_FEE },
        {
          $$type: "Repay",
          item: Address.parse(bond.tokenId),
        },
      );
      success = true;
    }
    return success;
  }

  async claim(bond: Bond): Promise<boolean> {
    let success = false;
    await this.lending.send(
      this.sender,
      { value: MIN_GAS_FEE },
      {
        $$type: "Claim",
        item: Address.parse(bond.tokenId),
      },
    );
    success = true;
    return success
  }

}