import firebase from "firebase";

export type BondProps = {
  listedTokenIds: string[];
  activeTokenIds: string[];
  baseUrl: string;
};

export const getListedTokenIds = async (): Promise<string[]> => {
  // Get listed items
  let snapshot = await firebase.database().ref("/terms").once("value");
  const allTerms = snapshot.val();
  const listedTokenIds = allTerms ? Object.keys(allTerms) : [];
  return listedTokenIds;
}