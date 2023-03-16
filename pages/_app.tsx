import { TonConnectUIProvider } from "@tonconnect/ui-react";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import firebaseHelper from "../firebaseHelper";
import "@/styles/globals.css";
import { TonDnsProvider } from "@/components/TonDnsProvider";
import {
  ChakraProvider,
  extendTheme
} from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark"
  }
});
import { Web3Provider } from "@/components/Web3Context";

firebaseHelper.initFirebase();

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
          <TonConnectUIProvider
            manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json" // TODO: change to our manifest
          // connector={new TonConnect({ manifestUrl: "https://raw.githubusercontent.com/ton-connect/wallets-list/main/wallets.json" })}
          >
            <TonDnsProvider>
              <Web3Provider>
                <ChakraProvider theme={theme}>
                  <Component {...pageProps} />
                </ChakraProvider>
              </Web3Provider>
            </TonDnsProvider>
          </TonConnectUIProvider>
      ) : null}
    </>
  );
}
