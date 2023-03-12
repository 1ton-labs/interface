import firebase from "firebase";
import { calcInterest, getBond, getLoan, getTokenId } from "@/core/utils";
import { Loan, Metadata, NftState, Offer, Terms } from "@/types";
import { randomIncomes } from "./metadata";

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

export const getMockAssetProps = () => {
  const item = {
    name: "ZoeTestNFT",
    description: "",
    external_url: "",
    image: "https://pbs.twimg.com/profile_images/1552965860154757120/UFHnlN_s_400x400.jpg",
    marketplace: "",
    attributes: [
      {
        trait_type: "Followers",
        value: "12222",
      },
      {
        trait_type: "Posts",
        value: "9874",
      }
    ],
    // Rich contents
    bio: "Born with an innate talent for art, the painting creator began expressing themselves through drawing and painting at an early age. They pursued formal training in fine arts and spent years mastering various techniques, mediums, and styles.",
    plan: "The business plan is to create a platform that invites artists from around the world to participate in a unique challenge: to draw pictures of mountain gods. This challenge aims to explore the cultural and spiritual significance of mountains in different cultures and promote art that celebrates the diversity of human experiences",
    // Bond parameters
    platform: "bintango",
    // platform: ["bintango"],
    id: "666",
    duration: 60,
    percentage: 0.8,
    profiles: [
      {
        type: "twitter",
        id: "011",
        name: "BoredTownNFT",
        image: "https://pbs.twimg.com/media/FqTp5gbaYAAYlS2?format=jpg&name=240x240",
        link: "https://twitter.com/BoredTownNFT",
        followers: [122222],
        posts: [235],
        last_update: "2023 06 03",
      },
      {
        type: "instagram",
        id: "012",
        name: "boredtown.nft",
        image: "https://instagram.ftpe8-4.fna.fbcdn.net/v/t51.2885-19/293491320_607877680655870_4793393801934044260_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.ftpe8-4.fna.fbcdn.net&_nc_cat=102&_nc_ohc=gtbLiXZVvw8AX9QLxrq&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfCcoAt6Qgzi7iMNZq_a0v9J_IFU57JJBKVX8s0a4xRpQQ&oe=640B247C&_nc_sid=8fd12b",
        link: "https://www.instagram.com/boredtown.nft/",
        followers: [0],
        posts: [1],
        last_update: "2023 06 03",
      }
    ],
    incomes: [
      {
        platform: "cyberconnect",
        past_incomes: randomIncomes(),
        estimated_incomes: [874],
        assured_incomes: [234],
      },
      {
        platform: "bintango",
        past_incomes: randomIncomes(),
        estimated_incomes: [3455],
        assured_incomes: [34556],
      }
    ],
    // Additional NFT fields
    token_id: "",
    token_address: "EQD5-NmtcEMqHCsqYTWuLb3AzlY00eELl2YFiIA4eW1hD4vl",
    owner_address: "0x38E042a4309db6C051986731B66ef4a9d699B123",
    state: 1,
    activated: 4,
    activated_time: 1678373292884,
  }
  const desiredTerms = {
    principal: 1000,
    repayment: 0.2,
    duration: 90,
    expires: 20,
  }
  const offers = [
    {
      tokenId: "EQD5-NmtcEMqHCsqYTWuLb3AzlY00eELl2YFiIA4eW1hD4vl",
      principal: "98",
      repayment: "3",
      duration: "3",
      interest: "23",
      signer: "EQD5-NmtcEMqHCsqYTWuLb3AzlY00eELl2YFiIA4eW1hD4vl",
      expires: "6890",
    },
    {
      tokenId: "0x38E042a4309db6C051986731B66ef4a9d699B009",
      principal: "846",
      repayment: "95",
      duration: "89",
      interest: "344",
      signer: "0x38E042a4309db6C051986731B66ef4a9d699B009",
      expires: "8490",
    }
  ]
  const loan = {
    principal: 10000,
    repayment: 12,
    duration: 3,
    start_time: 23344555,
    borrower: "0x38E042a4309db6C051986731B66ef4a9d699B009",
    lender: "0x3448E042a4309db6C051986731B66ef4a9d69934",
  }
  return { item, desiredTerms, offers, loan };
}
