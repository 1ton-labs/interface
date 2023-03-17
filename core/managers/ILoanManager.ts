import { Bond, Offer } from "@/types";

export interface ILoanManager {
  signOffer(offer: Offer): Promise<void>;
  cancelOffer(offer: Offer): Promise<void>;
  startLoan(bond: Bond, offer: Offer): Promise<boolean>;
  repay(bond: Bond): Promise<boolean>;
  claim(bond: Bond): Promise<boolean>;
}
