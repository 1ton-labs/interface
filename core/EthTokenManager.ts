import { WBNB_ADDRESS } from "@/constants";
import { WBNB, WBNB__factory } from "@/contracts/sprout";
import firebaseHelper from "@/firebaseHelper";
import { Signer } from "ethers";
import { ITokenManager } from "./ITokenManager";

export class EthTokenManager implements ITokenManager {

  private readonly wbnbContract: WBNB;

  constructor(private readonly signer: Signer) {
    this.wbnbContract = WBNB__factory.connect(WBNB_ADDRESS, this.signer);

    firebaseHelper.initFirebase();
  }

  async approveToken(contractAddress: string, amount: string): Promise<boolean> {
    let success = false;
    const approveTx = await this.wbnbContract.approve(contractAddress, amount);  // ethers.utils.parseEther(offer.principal)
    await approveTx.wait();
    success = true;
    return success;
  }

  async wrapToken(amount: string): Promise<boolean> {
    let success = false;
    const depositTx = await this.wbnbContract.deposit({ value: amount });
    await depositTx.wait();
    success = true;
    return success;
  }

  async withdrawToken(amount: string): Promise<boolean> {
    let success = false;
    const withdrawTx = await this.wbnbContract.withdraw(amount);
    await withdrawTx.wait();
    success = true;
    return success;
  }
}