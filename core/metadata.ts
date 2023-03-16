import firebase from "firebase";

import { THEME } from "@/constants";
import firebaseHelper from "@/firebaseHelper";
import { DefaultProfileQuery } from "@/graphql/lens/generated";
import { CCAddress, Income, Metadata, NftItemTrait, platformType, Profile } from "@/types";

firebaseHelper.initFirebase();

const PROFILE_ORDER = [
  platformType.BINTANGO,
  platformType.TWITTER,
  platformType.TIKTOK,
  platformType.INSTAGRAM,
  platformType.TELEGRAM,
  platformType.YOUTUBE,
  platformType.CYBERCONNECT,
  platformType.LENS,
  platformType.MIRROR,
];

function convertIpfsUrl(url: string) {
  return url.replace("ipfs://", "https://ipfs.io/ipfs/");
}

export const randomIncomes = () => {
  return [...Array(12)].map(_ => Math.ceil(Math.random() * 1000))
}

type TwitterUser = {
  id: string;
  name: string;
  public_metrics: {
    followers_count: number;
    following_count: number;
    listed_count: number;
    tweet_count: number;
  };
  username: string;
  profile_image_url: string;
};

export async function getTwitterProfile(username: string): Promise<Profile> {
  const res = await fetch(`/api/twitter?username=${username}`);
  const twitterUser: TwitterUser = (await res.json()).data;
  return {
    type: platformType.TWITTER,
    id: twitterUser.id,
    name: twitterUser.name,
    image: twitterUser.profile_image_url.replace("_normal", "_400x400"),  // Replace it with the higher resolution image
    link: "https://twitter.com/" + username,
    followers: [twitterUser.public_metrics.followers_count],
    posts: [twitterUser.public_metrics.tweet_count],
    last_update: "",
  }
};

export async function getCyberConnectProfile(address: string): Promise<Profile | undefined> {
  const res = await fetch(`/api/cc?address=${address}`);
  const resQL = await res.json();
  const { wallet } = resQL.address as CCAddress;
  if (wallet?.primaryProfile) {
    return {
      type: platformType.CYBERCONNECT,
      id: address,
      name: wallet.primaryProfile.handle,
      image: convertIpfsUrl(wallet.primaryProfile.avatar),
      link: "https://ipfs.moralis.io:2053/ipfs/" + wallet.primaryProfile.metadata,
      followers: [0],
      posts: [0],
      last_update: "N/A",
    }
  }
}

export async function getLensProtocolProfile(address: string): Promise<Profile | undefined> {
  const res = await fetch(`/api/lens?address=${address}`);
  const defaultProfileQuery: DefaultProfileQuery = await res.json();
  const lensUser = defaultProfileQuery.defaultProfile;
  if (lensUser) {
    const lensPicture = lensUser.picture as any;
    return {
      type: platformType.LENS,
      id: address,
      name: lensUser.name ?? "",
      image: convertIpfsUrl(lensPicture.original.url),
      link: "https://lenster.xyz/u/" + lensUser.handle,
      followers: [lensUser.stats.totalFollowers],
      posts: [lensUser.stats.totalPosts],
      last_update: "N/A",
    };
  }
}

export async function generateMetadata(
  username: string,
  platform: string,
  address: string,
  bio: string,
  plan: string,
  duration: number,  // months
  percentage: number,  // floating points from 0~1
): Promise<Metadata> {
  const attributes: NftItemTrait[] = [];
  const profiles: Profile[] = [];
  const incomes: Income[] = [];

  const twitterProfile = await getTwitterProfile(username);
  profiles.push(twitterProfile);

  switch (platform.toLowerCase()) {
    case "bintango":
      attributes.push({
        trait_type: "Platform",
        value: "BintanGO",
      });
      incomes.push({
        platform: platformType.BINTANGO,
        past_incomes: [Math.floor(Math.random() * 1000)],
        estimated_incomes: [Math.floor(Math.random() * 1000)],
        assured_incomes: [Math.floor(Math.random() * 100)],
      });
      break;
    case "cyberconnect":
      attributes.push({
        trait_type: "Platform",
        value: "CyberConnect",
      });
      incomes.push({
        platform: platformType.CYBERCONNECT,
        past_incomes: [Math.floor(Math.random() * 1000)],
        estimated_incomes: [Math.floor(Math.random() * 1000)],
        assured_incomes: [Math.floor(Math.random() * 100)],
      });
      break;
    case "lens":
      incomes.push({
        platform: platformType.LENS,
        past_incomes: [Math.floor(Math.random() * 1000)],
        estimated_incomes: [Math.floor(Math.random() * 1000)],
        assured_incomes: [Math.floor(Math.random() * 100)],
      });
      break;
    default:
      throw Error(`Unsupported platform: ${platform}. Only BintanGO, CyberConnect and Lens work.`);
  }

  attributes.push({
    trait_type: "Name",
    value: twitterProfile.name,
  });
  attributes.push({
    trait_type: "Duration",
    value: Math.floor(duration).toString() + (duration > 1 ? " Months" : " Month"),
  });
  attributes.push({
    trait_type: "Percentage",
    value: Math.floor(percentage * 100).toString() + "%",
  });

  return {
    // NFT metadata standards
    name: twitterProfile.name,
    description: twitterProfile.name + " on " + platform,
    external_url: "",
    image: twitterProfile.image,
    marketplace: THEME,
    attributes,
    // Rich contents
    bio,
    plan,
    // Bond parameters
    platform: platform.toLowerCase(),
    id: twitterProfile.id,
    duration: duration,
    percentage: percentage,
    // Social media
    profiles: profiles,
    incomes: incomes,
  };
}

export async function generateMetadataWithProfiles(
  profiles: Profile[],
  bio: string,
  plan: string,
  duration: number,  // months
  percentage: number,  // floating points from 0~1)
): Promise<Metadata | undefined> {
  const attributes: NftItemTrait[] = [];
  const incomes: Income[] = [];
  if (profiles.length === 0) {
    return;
  }
  let platform = profiles[0].type;
  if (platform === platformType.TWITTER) {
    // Replace twitter with bintango
    platform = platformType.BINTANGO;
  }
  switch (platform.toLowerCase()) {
    case "bintango":
    case "twitter":  // Current twitter are BintanGO
      attributes.push({
        trait_type: "Platform",
        value: "BintanGO",
      });
      incomes.push({
        platform: platformType.BINTANGO,
        past_incomes: randomIncomes(),
        estimated_incomes: randomIncomes(),
        assured_incomes: randomIncomes(),
      });
      break;
    case "cyberconnect":
      attributes.push({
        trait_type: "Platform",
        value: "CyberConnect",
      });
      incomes.push({
        platform: platformType.CYBERCONNECT,
        past_incomes: randomIncomes(),
        estimated_incomes: randomIncomes(),
        assured_incomes: randomIncomes(),
      });
      break;
    case "lens":
      incomes.push({
        platform: platformType.LENS,
        past_incomes: randomIncomes(),
        estimated_incomes: randomIncomes(),
        assured_incomes: randomIncomes(),
      });
      break;
    default:
      throw Error(`Unsupported platform: ${profiles[0].type}. Only BintanGO, CyberConnect and Lens work.`);
  }

  attributes.push({
    trait_type: "Name",
    value: profiles[0].name,
  });
  attributes.push({
    trait_type: "Duration",
    value: Math.floor(duration).toString() + (duration > 1 ? " Months" : " Month"),
  });
  attributes.push({
    trait_type: "Percentage",
    value: Math.floor(percentage * 100).toString() + "%",
  });

  const sortedProfiles = [...profiles].sort((a, b) => PROFILE_ORDER.indexOf(a.type) - PROFILE_ORDER.indexOf(b.type));

  return {
    // NFT metadata standards
    name: profiles[0].name,
    description: profiles[0].name + " on " + platform,
    external_url: "",
    image: profiles[0].image,
    marketplace: THEME,
    attributes,
    // Rich contents
    bio,
    plan,
    // Bond parameters
    platform: platform.toLowerCase(),
    id: profiles[0].id,
    duration: duration,
    percentage: percentage,
    // Social media
    profiles: sortedProfiles,
    incomes: incomes,
  };
}

export async function getMetadata(tokenId: number): Promise<Metadata> {
  const snapshot = await firebase
    .database()
    .ref(`/items/${tokenId}`)
    .once("value");
  const metadata: Metadata = snapshot.val();

  return metadata;
}