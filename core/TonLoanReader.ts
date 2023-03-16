import { LENDING_PROTOCOL_ADDRESS } from "@/constants";
import { Lending, TonLoan } from "@/contracts/1ton/Lending";

import { Bond, FuncContract, Loan } from "@/types";
import { Address, TonClient4 } from "ton";
import { ILoanReader } from "./ILoanReader";

export class TonLoanReader implements ILoanReader {

  private client4: TonClient4;
  private lending: FuncContract<Lending>;

  constructor() {
    this.client4 = new TonClient4({ endpoint: "https://sandbox-v4.tonhubapi.com" });
    this.lending = this.client4.open(new Lending(Address.parse(LENDING_PROTOCOL_ADDRESS)));
  }

  async getLoans(): Promise<Map<string, Loan>> {
    const loans = await this.lending.getLoanPool();
    const result = new Map<string, Loan>();

    loans.forEach((loan, address) => {
      result.set(address.toString(), this.tonloanToLoan(loan))
    })
    return result;
  }

  async getLoanByBond(bond: Bond): Promise<Loan | null> {
    const loan = await this.lending.getLoan(Address.parse(bond.tokenId));
    if (loan) {
      return this.tonloanToLoan(loan);
    } else {
      return null;
    }
  }

  private tonloanToLoan(loan: TonLoan) {
    return {
      loan_id: "",  // TODO
      principal: loan.principal.toString(),
      repayment: loan.repayment.toString(),
      duration: Number(loan.duration),
      start_time: Number(loan.start_time),
      borrower: loan.borrower.toString(),
      lender: loan.lender.toString()
    }
  }

}