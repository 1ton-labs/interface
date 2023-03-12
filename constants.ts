import { toNano } from "ton-core";

export const APP_CHAIN = process.env.NEXT_PUBLIC_APP_CHAIN?.toString() ?? "";
export const TONSCAN_URL = process.env.NEXT_PUBLIC_TONSCAN_URL?.toString() ?? "";
export const BSCSCAN_URL = process.env.NEXT_PUBLIC_BSCSCAN_URL?.toString() ?? "";
export const LENDING_PROTOCOL_ADDRESS =
  process.env.NEXT_PUBLIC_LENDING_PROTOCOL_ADDRESS?.toString() ?? "";
export const NFT_COLLECTION_ADDRESS =
  process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS?.toString() ?? "";
export const TREASURY_ADDRESS =
  process.env.NEXT_PUBLIC_TREASURY_ADDRESS?.toString() ?? "";
export const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID?.toString() ?? "";
export const WBNB_ADDRESS =
  process.env.NEXT_PUBLIC_WBNB_ADDRESS?.toString() ?? "";
export const NFT_BASE_URI = process.env.NEXT_PUBLIC_NFT_BASE_URI?.toString() ?? "";
export const MOCK_USER_ADDRESS = process.env.NEXT_PUBLIC_MOCK_USER_ADDRESS;
export const MIN_GAS_FEE = toNano("0.05");
export const THEME = process.env.NEXT_PUBLIC_THEME ?? "1ton";

export const SCAN_URL = THEME === "1ton" ? TONSCAN_URL : BSCSCAN_URL;
export const SECONDS_IN_DAY = 86400;
export const TOKEN_NAME = THEME === "1ton" ? "TON" : "WBNB";
export const PROJECT_NAME = THEME === "1ton" ? "1TON" : "Sprout";
