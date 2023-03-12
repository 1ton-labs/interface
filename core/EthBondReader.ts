import { LENDING_PROTOCOL_ADDRESS, NFT_COLLECTION_ADDRESS } from "@/constants";
import { NFT, NFT__factory } from "@/contracts/sprout";
import { Metadata, NftItemRecord } from "@/types";
import firebase from "firebase";
import { IBondReader } from "./IBondReader";
import { getMetadata } from "./metadata";
import { getEthChain } from "./utils";
import { provider } from "./wagmi";

export class EthBondReader implements IBondReader {

  private readonly nftContract: NFT;

  constructor() {
    const chain = getEthChain();
    this.nftContract = NFT__factory.connect(NFT_COLLECTION_ADDRESS, provider({ chainId: chain.id }));
  }

  async getBond(tokenId: string): Promise<Metadata> {
    return this.fetchNftItemById(tokenId);
  }

  async getBondRecords(): Promise<NftItemRecord[]> {
    // Loan cache
    let changed = false;
    const snapshot = await firebase.database().ref(`/records/${NFT_COLLECTION_ADDRESS}`).once("value");
    const cacheRecords = snapshot.val();
    const itemRecords: NftItemRecord[] = [];
    if (cacheRecords) {
      itemRecords.push(...cacheRecords);
    }
    // Load new NFTs
    const itemSnapshot = await firebase.database().ref("/items").once("value");
    const allMetadataNum = itemSnapshot.val()?.length ?? 0;
    // const itemNum = Number(await this.nftContract.totalSupply());
    let i = itemRecords.length > 0 ? itemRecords[itemRecords.length - 1].token_id + 1 : 0;  // Last token id in the cache
    let j = i;  // Successful tokens
    while (i < allMetadataNum) {
      changed = true;
      try {
        const owner = await this.nftContract.ownerOf(i);
        itemRecords.push({
          token_id: i,
          address: NFT_COLLECTION_ADDRESS,
          collection_address: NFT_COLLECTION_ADDRESS,
          owner_address: owner,
        });
        j++;
      } catch (e) {
        // Ignore Burned NFTs
      }
      i++;
    }
    // Update cache
    if (changed) {
      await firebase.database().ref(`/records/${NFT_COLLECTION_ADDRESS}`).set(itemRecords);
    }
    return itemRecords;
  }

  async getBondActivatedTime(tokenId: string): Promise<number> {
    const activateTime = await this.nftContract.activateTime(tokenId);
    return Number(activateTime) * 1000;  // s -> ms
  }

  async fetchNftItemById(id: string) {
    let owner = "";
    try {
      owner = await this.nftContract.ownerOf(id);
    } catch (e) {
      // Ingore burned NFT
    }
    const nftItem: Metadata = await getMetadata(Number(id));
    nftItem.token_id = Number(id);
    nftItem.token_address = LENDING_PROTOCOL_ADDRESS;
    nftItem.owner_address = owner;
    return nftItem;
  }

}