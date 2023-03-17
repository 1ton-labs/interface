import firebase from "firebase";
import { calcInterest, getBond, getLoan, getTokenId } from "@/core/utils";
import { Loan, Metadata, NftState, Offer, Terms } from "@/types";

export type AssetProps = {
  item: Metadata;
  desiredTerms: Terms | null;
  offers: Offer[];
  loan: Loan | null;
};

export const getAssetProps = async (tokenId: string): Promise<AssetProps> => {
  const item = await getBond(tokenId);
  // Get desired terms
  let snapshot = await firebase.database().ref(`/terms/${getTokenId(item)}`).once("value");
  let desiredTerms = snapshot.val();
  if (desiredTerms === undefined) {
    desiredTerms = null;
  }
  item.state = desiredTerms === null ? NftState.NOT_LISTED : NftState.LISTED;
  // Get offers
  snapshot = await firebase.database().ref(`/offers/${tokenId}`).once("value");
  const signedTerms: Terms[] = snapshot.val();
  const offers: Offer[] = [];
  if (signedTerms !== undefined && signedTerms !== null) {
    Object.entries(signedTerms).forEach(([signer, terms]) => {
      offers.push({
        tokenId: getTokenId(item),
        principal: terms.principal,
        repayment: terms.repayment,
        duration: terms.duration,
        interest: calcInterest(
          parseFloat(terms.principal),
          parseFloat(terms.repayment),
          parseFloat(terms.duration),
        ).toString(),
        signer,
        expires: terms.expires,
      });
    });
  }
  // // Get active loan stats
  // snapshot = await firebase.database().ref(`/loans/${item.token_address}`).once("value");
  // let loan = snapshot.val();
  // if (loan === undefined) {
  //   loan = null;
  // }
  // Get active loan stats from contract
  const loan = await getLoan(item);

  if (loan) {
    item.state = NftState.ACTIVE;
  }

  return {
    item,
    desiredTerms,
    offers,
    loan,
  };
};
