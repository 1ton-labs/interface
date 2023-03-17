import firebase from "firebase";

import firebaseHelper from "@/firebaseHelper";
import { Income, Metadata, NftItemTrait, platformType, Profile } from "@/types";

firebaseHelper.initFirebase();

const PROFILE_ORDER = [
  platformType.BINTANGO,
  platformType.TWITTER,
  platformType.TIKTOK,
  platformType.INSTAGRAM,
  platformType.TELEGRAM,
  platformType.YOUTUBE,
];

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
    marketplace: "1ton",
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
    marketplace: "1ton",
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