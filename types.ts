import { Address, ContractProvider } from "ton";

export enum NftState {
  NOT_LISTED = 0,
  LISTED = 1,
  ACTIVE = 2,
};

export enum platformType {
  TWITTER = "twitter",
  TIKTOK = "tiktok",
  YOUTUBE = "youtube",
  INSTAGRAM = "instagram",
  TELEGRAM = "telegram",
  BINTANGO = "bintango",
  CYBERCONNECT = "cyberconnect",
  LENS = "lens",
  MIRROR = "mirror",
};

export function stateName(state: number) {
  if (state === NftState.NOT_LISTED) {
    return "Not Listed";
  } else if (state === NftState.LISTED) {
    return "Listed";
  } else if (state === NftState.ACTIVE) {
    return "Active";
  } else if (state === BondState.ACTIVATED) {
    return "Activated";
  } else if (state === BondState.INACTIVATED) {
    return "Inactivated";
  } else if (state === BondState.EXPIRED) {
    return "Expired";
  } else {
    return "Unknown";
  }
}

export type NftItemTrait = {
  trait_type: string;
  value: string;
};

export type Metadata = {
  // NFT metadata standards
  name: string;
  description: string;
  external_url: string;
  image: string;
  marketplace: string;
  attributes: NftItemTrait[];
  // Rich contents
  bio: string;
  plan: string;
  // Bond parameters
  platform: string;
  id: string;
  duration: number;
  percentage: number;
  profiles: Profile[];
  incomes: Income[];
  // Additional NFT fields
  token_id?: number;
  token_address?: string;
  owner_address?: string;
  state?: NftState;
  activated_time?: number;
  activated?: BondState;
  balance?: string;
  poolCreated?: boolean;
};

export type Profile = {
  type: platformType;
  id: string;
  name: string;
  image: string;
  link: string;
  followers: number[];
  posts: number[];
  last_update: string;
};

export type Income = {
  platform: platformType;
  past_incomes: number[];
  estimated_incomes: number[];
  assured_incomes: number[];
}

export type NftItem = {
  token_id?: number;
  token_address?: string;
  owner_address?: string;
  name: string;
  description: string;
  external_url: string;
  image: string;
  marketplace: string;
  platform: string;
  id: string;
  display_name: string;
  attributes: NftItemTrait[];
  state?: NftState;
  followers: number[];
};

export type NftItemRecord = {
  token_id: number;
  address: string;
  collection_address: string;
  owner_address: string | null;
};

export type Terms = {
  principal: string;
  repayment: string;
  duration: string;
  expires: string;
};

export type Offer = {
  tokenId: string; // NFT address in TON, NFT ID in Ethereum
  principal: string;
  repayment: string;
  duration: string;
  interest: string;
  signer: string;
  expires: string;
}

export type Loan = {
  principal: string;
  repayment: string;
  duration: number;
  start_time: number;
  borrower: string;
  lender: string;
  loan_id: string;
}

export type RawLoan = {
  $$type: string;
  principal: bigint;
  repayment: bigint;
  duration: bigint;
  start_time: bigint;
  borrower: Address;
  lender: Address;
}

export type Bond = {
  loanId: string,
  tokenId: string // NFT address in TON, NFT ID in Ethereum
}

export enum BondState {
  INACTIVATED = 3,
  ACTIVATED = 4,
  EXPIRED = 5,
}

export type CCEssenceNode = {
  essenceID: string;
}

export type CCEssenceEdge = {  // TODO: confirm the types
  node: {
    essenceID: number;
    tokenURI: string;
    createdBy: CCProfile;
  };
}

export type CCEssences = {
  totalCount: number;
  edges: CCEssenceEdge[];
}

export type CCProfile = {
  id: string;
  profileID: number;
  handle: string;
  metadata: string;
  avatar: string;
  isPrimary: boolean;
  essences?: CCEssences;
}

export type CCProfileEdge = {
  node: CCProfile;
}

export type CCProfiles = {
  totalCount: number;
  edges: CCProfileEdge;
}

export type CCWallet = {
  primaryProfile: CCProfile;
  profiles: CCProfiles;
}

export type CCAddress = {
  wallet: CCWallet;
}

export type FuncContract<T> = { [P in keyof T]: P extends `get${string}` | `send${string}` ? T[P] extends (x: ContractProvider, ...args: infer P_1) => infer R ? (...args: P_1) => R : never : T[P]; }