import { NFT_COLLECTION_ADDRESS } from "@/constants";
import { Bond as BondContract } from "@/contracts/1ton/Bond";
import { BondItem as BondItemContract } from "@/contracts/1ton/BondItem";
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
    if (this.sender.address) {
      try {
        const collection = this.client4.open(
          new BondContract(Address.parse(NFT_COLLECTION_ADDRESS))
        );
        const collectionData = await collection.getCollectionData();
        const nextItemIndex = Number(collectionData.next_item_index);

        await collection.sendMint(
          this.sender,
          {
            value: toNano("0.06"),
            nextItemId: nextItemIndex,
            owner: this.sender.address,
          }
        );
        await firebase.database().ref(`/items/${nextItemIndex}`).set(parameter.metadata);
        success = true;
      } catch (error) {
        console.error(error);
      }
    }
    return success;
  }

  async transfer(key: string, recipient: string): Promise<boolean> {
    let success = false;
    if (this.sender.address) {
      try {
        const item = this.getBondItemContract(key);
        await item.sendTransfer(
          this.sender,
          {
            value: toNano("0.1"),
            newOwner: Address.parse(recipient),
            responseDestination: this.sender.address,
            forwardAmount: BigInt(0),
            forwardPayload: beginCell().endCell(),
          },
        );
        success = true;
      } catch (error) {
        console.error(error);
      }
    }
    return success;
  }

  async burn(bond: Bond): Promise<boolean> {
    let success = false;
    if (this.sender.address) {
      try {
        const item = this.getBondItemContract(bond.tokenId);
        await item.sendBurn(
          this.sender,
          toNano("0.03"),
        );
        success = true;
      } catch (error) {
        console.error(error);
      }
    }
    return success;
  }

  async activate(bond: Bond): Promise<boolean> {
    let success = false;
    if (this.sender.address) {
      try {
        const item = this.getBondItemContract(bond.tokenId);
        await item.sendActivate(
          this.sender,
          toNano("0.03"),
        );
        success = true;
      } catch (error) {
        console.error(error);
      }
    }
    return success;
  }

  private getBondItemContract(key: string) {
    return this.client4.open(
      BondItemContract.createFromAddress(Address.parse(key))
    );
  }
}