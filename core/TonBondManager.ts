import { NFT_COLLECTION_ADDRESS } from "@/constants";
import { Collection } from "@/contracts/1ton_Collection";
import { Item } from "@/contracts/1ton_Item";
import { Bond } from "@/types";
import firebase from "firebase";
import { Address, beginCell, Sender, toNano, TonClient4 } from "ton";
import { BondParameter, IBondManager } from "./IBondManager";

export class TonBondManager implements IBondManager {

  private client4: TonClient4;

  constructor(private readonly sender: Sender) {
    this.client4 = new TonClient4({ endpoint: "https://sandbox-v4.tonhubapi.com" });
  }

  async mint(parameter: BondParameter): Promise<boolean> {
    let success = false;
    const collection = this.client4.open(Collection.fromAddress(Address.parse(NFT_COLLECTION_ADDRESS)));
    const collectionData = await collection.getGetCollectionData();
    const nextItemIndex = Number(collectionData.next_item_index);
    await firebase.database().ref(`/items/${nextItemIndex}`).set(parameter.metadata);
    return success;
  }

  async transfer(key: string, recipient: string): Promise<boolean> {
    let success = false;
    if (this.sender.address) {
      const item_ = this.client4.open(Item.fromAddress(Address.parse(key)));
      await item_.send(
        this.sender,
        { value: toNano("0.1") },
        {
          $$type: "Transfer",
          queryId: BigInt(0),
          newOwner: Address.parse(recipient),
          responseDestination: this.sender.address,
          customPayload: null,
          forwardAmount: BigInt(0),
          forwardPayload: beginCell().endCell(),
        },
      );
      success = true;
    }
    return success;
  }

  async burn(bond: Bond): Promise<boolean> {
    let success = false
    try {
      const _item = this.client4.open(Item.fromAddress(Address.parse(bond.tokenId)));
      await _item.send(
        this.sender,
        { value: toNano("0.1") },
        {
          $$type: "BurnItem",
          queryId: BigInt(0),
        },
      );
      success = true;
    } catch (error) {
      console.error(error);
    }
    return success;
  }

  async activate(bond: Bond): Promise<boolean> {
    throw Error("Not implemented");
  }

}