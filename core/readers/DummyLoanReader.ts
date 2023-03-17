import { Bond, Loan } from "@/types";
import { ILoanReader } from "./ILoanReader";

export class DummyLoanReader implements ILoanReader {

  async getLoans(): Promise<Map<string, Loan>> { return new Map(); }

  async getLoanByBond(bond: Bond): Promise<Loan | null> { return null; }

}