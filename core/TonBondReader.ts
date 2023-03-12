import { NFT_COLLECTION_ADDRESS } from "@/constants";
import { Collection } from "@/contracts/1ton_Collection";
import { Item } from "@/contracts/1ton_Item";
import { Metadata, NftItemRecord, TactContract } from "@/types";
import firebase from "firebase";
import { Address, TonClient4 } from "ton";
import { IBondReader } from "./IBondReader";
import { getMetadata } from "./metadata";

export class TonBondReader implements IBondReader {

  private client4: TonClient4;
  private collection: TactContract<Collection>;

  constructor() {
    this.client4 = new TonClient4({ endpoint: "https://sandbox-v4.tonhubapi.com" });
    this.collection = this.client4.open(Collection.fromAddress(Address.parse(NFT_COLLECTION_ADDRESS)));
  }

  async getBond(tokenId: string): Promise<Metadata> {
    return this.fetchMetadataByAddress(tokenId);
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
    const collectionData = await this.collection.getGetCollectionData();
    const itemNum = Number(collectionData.next_item_index);
    for (let i = itemRecords.length; i < itemNum; i++) {
      changed = true;
      const nftItemAddress = await this.collection.getGetNftAddressByIndex(BigInt(i));
      if (nftItemAddress) {
        const item = this.client4.open(Item.fromAddress(nftItemAddress));
        const data = await item.getGetNftData();
        itemRecords.push({
          token_id: i,
          address: nftItemAddress.toString(),
          collection_address: data.collection_address.toString(),
          owner_address: data.owner_address?.toString() ?? null,
        });
      }
    }
    // Update cache
    if (changed) {
      await firebase.database().ref(`/records/${NFT_COLLECTION_ADDRESS}`).set(itemRecords);
    }
    return itemRecords;
  }

  async getBondActivatedTime(tokenId: string): Promise<number> {
    throw Error("Not implemented");
  }

  async fetchMetadataByAddress(address: string): Promise<Metadata> {
    // It only supports testnet
    const client4 = new TonClient4({
      endpoint: "https://sandbox-v4.tonhubapi.com",
    });
    const item = client4.open(Item.fromAddress(Address.parse(address)));
    const data = await item.getGetNftData();
    const metadata: Metadata = await getMetadata(Number(data.index));
    metadata.token_id = Number(data.index);
    metadata.token_address = address;
    metadata.owner_address = data.owner_address ? data.owner_address.toString() : "";
    return metadata;
  }

}
