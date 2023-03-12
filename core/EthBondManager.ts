import type { Signer } from "@wagmi/core"
import firebase from "firebase";

import { Bond } from "@/types";
import { BondParameter, IBondManager } from "./IBondManager";
import { NFT_COLLECTION_ADDRESS } from "@/constants";
import { NFT__factory, NFT } from "@/contracts/sprout";

export class EthBondManager implements IBondManager {

  private readonly contract: NFT;

  constructor(private readonly signer: Signer) {
    this.contract = NFT__factory.connect(NFT_COLLECTION_ADDRESS, signer);
  }

  async mint(parameter: BondParameter): Promise<boolean> {
    let success = false;
    // const nextItemIndex = Number(await this.contract.totalSupply());
    const tx = await this.contract.mint(1);
    await tx.wait();
    const snapshot = await firebase.database().ref("/items").once("value");
    const nextItemIndex = snapshot.val()?.length ?? 0
    await firebase.database().ref(`/items/${nextItemIndex}`).set(parameter.metadata);
    success = true

    return success;
  }

  async transfer(key: string, recipient: string): Promise<boolean> {
    let success = false;
    const signerAddress = await this.signer.getAddress();
    if (signerAddress) {
      const tx = await this.contract.transferFrom(signerAddress, recipient, key);
      await tx.wait();
      success = true;
    }
    return success;
  }

  async burn(bond: Bond): Promise<boolean> {
    let success = false
    try {
      const tx = await this.contract.burn(bond.tokenId);
      await tx.wait();
      success = true;
    } catch (error) {
      console.error(error);
    }
    return success;
  }

  async activate(bond: Bond): Promise<boolean> {
    let success = false;
    try {
      const tx = await this.contract.activate(bond.tokenId);
      await tx.wait();
      success = true;
    } catch (error) {
      console.error(error);
    }
    return success;
  }

}