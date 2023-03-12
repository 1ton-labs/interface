import { Bond, Offer } from "@/types";
import { ILoanManager } from "./ILoanManager";

export class DummyLoanManager implements ILoanManager {

  async signOffer(offer: Offer): Promise<void> { }

  async cancelOffer(offer: Offer): Promise<void> { }

  async startLoan(bond: Bond, offer: Offer): Promise<boolean> { return false; }

  async repay(bond: Bond): Promise<boolean> { return false; }

  async claim(bond: Bond): Promise<boolean> { return false; }

}