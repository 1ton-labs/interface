import { NFT_COLLECTION_ADDRESS, TREASURY_ADDRESS, WBNB_ADDRESS } from "@/constants";
import { Treasury, Treasury__factory } from "@/contracts/sprout";
import { BigNumber, ethers, Signer } from "ethers";
import { IPoolManager } from "./IPoolManager";

export class EthPoolManager implements IPoolManager {

  private readonly treasuryContract: Treasury;

  constructor(private readonly signer: Signer) {
    this.treasuryContract = Treasury__factory.connect(TREASURY_ADDRESS, signer);
  }

  async create(key: string): Promise<boolean> {
    let success = false;
    try {
      const nftId = parseInt(key);
      const tx = await this.treasuryContract.createPool(
        NFT_COLLECTION_ADDRESS,
        nftId,
        WBNB_ADDRESS,
        { gasLimit: 3000000 },
      );
      await tx.wait();
      success = true;
    } catch (e) {
      console.error(e);
    }
    return success;
  }

  async deposit(key: string, amount: string): Promise<boolean> {
    let success = false;
    try {
      const poolId = await this.getPoolId(key);
      const tx = await this.treasuryContract.deposit(
        poolId,
        WBNB_ADDRESS,
        ethers.utils.parseEther(amount),
        { gasLimit: 3000000 },
      );
      await tx.wait();
      success = true;
    } catch (e) {
      console.error(e);
    }
    return success;
  }

  async withdraw(key: string, amount: string): Promise<boolean> {
    let success = false;
    try {
      const poolId = await this.getPoolId(key);
      const tx = await this.treasuryContract.withdraw(
        poolId,
        WBNB_ADDRESS,
        ethers.utils.parseEther(amount),
        { gasLimit: 3000000 },
      );
      await tx.wait();
      success = true;
    } catch (e) {
      console.error(e);
    }
    return success;
  }

  async getPoolId(key: string): Promise<BigNumber> {
    const nftId = parseInt(key);
    const poolId = await this.treasuryContract.getPoolId(NFT_COLLECTION_ADDRESS, nftId);
    return poolId;
  }

}
