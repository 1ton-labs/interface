import { NFT_COLLECTION_ADDRESS } from "@/constants";
import { Bond as BondContract } from "@/contracts/1ton/Bond";
import { BondItem as BondItemContract } from "@/contracts/1ton/BondItem";
import { Metadata, NftItemRecord, FuncContract } from "@/types";
import firebase from "firebase";
import { Address, TonClient4 } from "ton";
import { IBondReader } from "./IBondReader";
import { getMetadata } from "./metadata";

export class TonBondReader implements IBondReader {
  private client4: TonClient4;
  private collection: FuncContract<BondContract>;

  constructor() {
    this.client4 = new TonClient4({ endpoint: "https://sandbox-v4.tonhubapi.com" });
    this.collection = this.client4.open(
      new BondContract(Address.parse(NFT_COLLECTION_ADDRESS))
    );
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
    const collectionData = await this.collection.getCollectionData();
    const itemNum = Number(collectionData.next_item_index);
    for (let i = itemRecords.length; i < itemNum; i++) {
      changed = true;
      const nftItemAddress = await this.collection.getNftAddressByIndex(i);
      if (nftItemAddress) {
        const item = this.getBondItemContract(nftItemAddress.toString());
        const data = await item.getNftData();
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
    const item = this.getBondItemContract(tokenId);
    const data = await item.getNftData();
    return data.activate_time;
  }

  async fetchMetadataByAddress(tokenId: string): Promise<Metadata> {
    const item = this.getBondItemContract(tokenId);
    const data = await item.getNftData();
    const metadata: Metadata = await getMetadata(Number(data.index));
    metadata.token_id = Number(data.index);
    metadata.token_address = tokenId;
    metadata.owner_address = data.owner_address ? data.owner_address.toString() : "";
    metadata.activated_time = data.activate_time;
    return metadata;
  }

  private getBondItemContract(key: string) {
    return this.client4.open(
      BondItemContract.createFromAddress(Address.parse(key))
    );
  }
}
