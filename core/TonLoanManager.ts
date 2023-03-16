import firebase from "firebase";
import { TonClient4 } from "ton";
import { Address, Sender } from "ton-core";

import { LENDING_PROTOCOL_ADDRESS, MIN_GAS_FEE } from "@/constants";

import { Lending } from "@/contracts/1ton/Lending";
import firebaseHelper from "@/firebaseHelper";
import { Bond, FuncContract, Loan, Offer, Terms } from "@/types";
import { ILoanManager } from "./ILoanManager";
import { ILoanReader } from "./ILoanReader";
import { TonLoanReader } from "./TonLoanReader";
import { safeNano } from "./utils";

export class TonLoanManager implements ILoanManager {

  private client4: TonClient4;
  private lending: FuncContract<Lending>;
  private loanReader: ILoanReader;

  constructor(private readonly sender: Sender) {
    this.client4 = new TonClient4({ endpoint: "https://sandbox-v4.tonhubapi.com" });
    this.lending = this.client4.open(new Lending(Address.parse(LENDING_PROTOCOL_ADDRESS)));
    this.loanReader = new TonLoanReader();

    firebaseHelper.initFirebase();
  }

  async signOffer(offer: Offer): Promise<void> {
    if (this.sender.address) {
      await this.lending.sendDeposit(
        this.sender,
        safeNano(offer.principal)
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
      await this.lending.sendWithdraw(
        this.sender,
        safeNano(offer.principal)
      );

      await firebase.database().ref(`/offers/${offer.tokenId}/${offer.signer}`).remove();
    }
  }

  async startLoan(bond: Bond, offer: Offer): Promise<boolean> {
    let success = false;
    await this.lending.sendStartLoan(
      this.sender,
      MIN_GAS_FEE,
      {
        investor: Address.parse(offer.signer),
        item: Address.parse(bond.tokenId),
        amount: safeNano(offer.principal),
        repay_amount: safeNano(offer.repayment),
        duration: BigInt(Math.floor(parseFloat(offer.duration) * 86400)),
      }
    );

    const loan: Loan = {
      loan_id: "",  // TODO: 
      principal: safeNano(offer.principal).toString(),
      repayment: safeNano(offer.repayment).toString(),
      duration: Math.floor(parseFloat(offer.duration) * 86400),
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
      await this.lending.sendRepay(
        this.sender,
        Address.parse(bond.tokenId),
        BigInt(parseInt(loan.repayment)),
      );
      success = true;
    }
    return success;
  }

  async claim(bond: Bond): Promise<boolean> {
    let success = false;
    await this.lending.sendClaim(
      this.sender,
      Address.parse(bond.tokenId)
    );
    success = true;
    return success
  }

}