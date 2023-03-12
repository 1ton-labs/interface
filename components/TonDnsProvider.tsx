import { LENDING_PROTOCOL_ADDRESS, NFT_COLLECTION_ADDRESS } from "@/constants";
import firebase from "firebase";
import { createContext, FC, ReactNode, useCallback, useEffect, useState } from "react";

type TonDnsContextProps = {
  initialized: boolean;
  toTonDns: (address: string) => (string|undefined);
};

export const TonDnsContext = createContext<TonDnsContextProps>({
  initialized: false,
  toTonDns: (address: string) => undefined,
});

type TonDnsProvider = {
  children: ReactNode;
};

export const TonDnsProvider: FC<TonDnsProvider> = ({ children }) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [data, setData] = useState<{[key: string]: string}>({});

  useEffect(() => {
    (async () => {
      if (!initialized) {
        console.log("Initializing TON DNS...");
        const snapshot = await firebase.database().ref("ton_dns").once("value");
        let newData = snapshot.val();
        if (newData === null) {
          newData = {};
        }
        newData[NFT_COLLECTION_ADDRESS] = "NFT Collection";
        newData[LENDING_PROTOCOL_ADDRESS] = "Lending Protocol";
        setData(newData);
        setInitialized(true);
      } else {
        console.warn("It's already been initialized.");
      }
    })();
  }, [initialized]);

  const toTonDns = useCallback((address: string) => {
    if (initialized && data && address in data) {
      return data[address];
    } else {
      return undefined;
    }
  }, [initialized, data]);

  return (
    <TonDnsContext.Provider value={{ initialized, toTonDns }}>{children}</TonDnsContext.Provider>
  )
};