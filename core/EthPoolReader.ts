import { NFT_COLLECTION_ADDRESS, TREASURY_ADDRESS } from "@/constants";
import { Treasury, Treasury__factory } from "@/contracts/sprout";
import { BigNumber } from "ethers";
import { IPoolReader } from "./IPoolReader";
import { getEthChain } from "./utils";
import { provider } from "./wagmi";

type PoolInfo = {
  nft: string;
  nftId: BigNumber;
  coin: string;
  balances: BigNumber;
}

function poolExists(poolInfo: PoolInfo | undefined): boolean {
  return poolInfo !== undefined && poolInfo.nft !== "0x0000000000000000000000000000000000000000";
}

export class EthPoolReader implements IPoolReader {

  private readonly treasuryContract: Treasury;

  constructor() {
    const chain = getEthChain();
    this.treasuryContract = Treasury__factory.connect(TREASURY_ADDRESS, provider({ chainId: chain.id }));
  }

  async poolCreated(key: string): Promise<boolean> {
    const poolInfo = await this.getPoolInfo(key);
    return poolExists(poolInfo);
  }

  async getBalance(key: string): Promise<string> {
    const poolInfo = await this.getPoolInfo(key);
    if (poolInfo) {
      return poolInfo.balances.toString();
    } else {
      return "0";
    }
  }

  async getPoolInfo(key: string): Promise<PoolInfo | undefined> {
    const nftId = parseInt(key);
    const poolId = await this.treasuryContract.getPoolId(NFT_COLLECTION_ADDRESS, nftId);
    if (poolId.eq(0)) {
      return undefined;
    }
    const poolInfo = await this.treasuryContract.getPoolInfo(poolId);
    return poolInfo;
  }

}
