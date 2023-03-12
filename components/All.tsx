import { FC, useEffect, useState } from "react";
import { NFT_COLLECTION_ADDRESS, SCAN_URL } from "@/constants";
import NFTCards from "./NFTCards";
import { Metadata, NftState } from "@/types";
import firebase from "firebase";
import { getActiveLoanKeys, getTokenId } from "@/core/utils";
import { getNftItems } from "@/core/api";
// import { Address } from "ton";

const All: FC = () => {
  const [items, setItems] = useState<Metadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const collectionUrl = SCAN_URL + NFT_COLLECTION_ADDRESS;

  useEffect(() => {
    // Run it after the page is loaded
    (async () => {
      // Get listed items
      let snapshot = await firebase.database().ref("/terms").once("value");
      const allTerms = snapshot.val();
      const listedTokenIds = allTerms ? Object.keys(allTerms) : [];
      const activeTokenIds = await getActiveLoanKeys();
      // Get NFT item records
      const _items = await getNftItems();
      // Assign states
      _items.forEach((item) => {
        item.state = NftState.NOT_LISTED;
        const tokenId = getTokenId(item);
        if (tokenId) {
          // const tokenAddress = Address.parse(tokenId).toString();
          if (listedTokenIds.includes(tokenId)) {
            item.state = NftState.LISTED;
          }
          if (activeTokenIds.includes(tokenId)) {
            item.state = NftState.ACTIVE;
          }
        }
      });
      setItems(_items);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex items-center flex-col mt-20 mb-20">
      <h2 className="w-full text-2xl font-bold text-start">
        All Creator Bond NFTs
      </h2>
      <p className="mb-6 w-full text-start">
        <span>Contract Address:&nbsp;</span>
        <a
          href={collectionUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-accent"
        >
          {NFT_COLLECTION_ADDRESS}
        </a>
      </p>
      {items.length > 0 ? (
        <NFTCards items={items} baseUrl="/finance" />
      ) : loading ? (
        <p>Loading NFT data from smart contract...</p>
      ) : (
        <p>I&apos;m sorry. No NFT is found in the NFT collection. 🫢</p>
      )}
    </div>
  );
};

export default All;
