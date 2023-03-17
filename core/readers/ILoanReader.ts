import { Bond, Loan } from "@/types";

export interface ILoanReader {
  getLoans(): Promise<Map<string, Loan>>;
  getLoanByBond(bond: Bond): Promise<Loan | null>;
}
