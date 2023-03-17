import contents from "@/contents";
import { getNftItems } from "@/core/api";
import { BondProps } from "@/core/bond";
import { getTokenId } from "@/core/utils";
import { useWeb3 } from "@/hooks/useWeb3";
import { Metadata, NftState } from "@/types";
import { FC, useEffect, useState } from "react";
import NFTCards from "./NFTCards";

export const BondContent: FC<BondProps> = ({ listedTokenIds, activeTokenIds, baseUrl }) => {
  const { connected, address } = useWeb3();
  const [loading, setLoading] = useState<boolean>(false);
  const [holdItems, setHoldItems] = useState<Metadata[]>([]);

  useEffect(() => {
    if (connected) {
      (async () => {
        setHoldItems([]);
        setLoading(true);
        const items = await getNftItems();
        const _holdItems = items.filter((item) => item.owner_address === address);
        _holdItems.forEach((item) => {
          item.state = NftState.NOT_LISTED;
          if (item.token_address) {
            if (listedTokenIds.includes(getTokenId(item))) {
              item.state = NftState.LISTED;
            }
            if (activeTokenIds.includes(getTokenId(item))) {
              item.state = NftState.ACTIVE;
            }
          }
        });
        setHoldItems(_holdItems);
        setLoading(false);
      })();
    } else {
      setHoldItems([]);
    }
  }, [connected, address, listedTokenIds, activeTokenIds]);

  return (
    <div className="flex items-center flex-col mt-20">
      <h1 className="mb-6 w-full font-bold text-xl text-start">{contents.finance.borrow.header}</h1>
      {loading ? (
        <p>Loading the smart contract data...</p>
      ) : (holdItems.length > 0) ? (
        <NFTCards items={holdItems} baseUrl={baseUrl} />
      ) : connected ? (
        <p>You don&apos;t have any account NFT. 😢</p>
      ) : (
        <p>Please connect to your wallet. 😀</p>
      )}
    </div>
  );
};
