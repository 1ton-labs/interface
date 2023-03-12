import { WBNB_ADDRESS } from "@/constants";
import { WBNB, WBNB__factory } from "@/contracts/sprout";
import firebaseHelper from "@/firebaseHelper";
import { getEthChain } from "./utils";
import { provider } from "./wagmi";

export class EthTokenReader {

  private readonly wbnbContract: WBNB;

  constructor() {
    const chain = getEthChain();
    this.wbnbContract = WBNB__factory.connect(WBNB_ADDRESS, provider({ chainId: chain.id }));

    firebaseHelper.initFirebase();
  }

  async allowanceWBNB(signerAddress: string, contractAddress: string) {
    const allowance = await this.wbnbContract.allowance(signerAddress, contractAddress);
    return allowance;
  }

  async balanceWBNB(address: string) {
    const balance = await this.wbnbContract.balanceOf(address);
    return balance;
  }

}