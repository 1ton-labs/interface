import {
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { configureChains, createClient } from "wagmi";

import { getEthChain } from "./utils";
import { WALLET_CONNECT_PROJECT_ID } from "@/constants";

// Configure web3modal
if (!WALLET_CONNECT_PROJECT_ID) {
  throw new Error(
    "You need to provide NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID env variable"
  );
}
const projectId = WALLET_CONNECT_PROJECT_ID;
const chains = [getEthChain()];
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    version: "1",
    appName: "web3Modal",
    chains,
    projectId,
  }),
  provider,
});

export { provider, chains };
export default wagmiClient;
