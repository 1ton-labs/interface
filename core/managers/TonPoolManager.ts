import { TonClient4 } from "ton";
import { Address, Sender } from "ton-core";

import { MIN_GAS_FEE, TREASURY_ADDRESS } from "@/constants";

import firebaseHelper from "@/firebaseHelper";
import { FuncContract } from "@/types";
import { IPoolManager } from "../managers/IPoolManager";
import { TreasuryPool } from "@/contracts/1ton/TreasuryPool";
import { safeNano } from "../utils";
import { TreasuryAdmin } from "@/contracts/1ton/TreasuryAdmin";

export class TonPoolManager implements IPoolManager {

  private client4: TonClient4;
  private treasuryAdmin: FuncContract<TreasuryAdmin>;

  constructor(private readonly sender: Sender) {
    this.client4 = new TonClient4({ endpoint: "https://sandbox-v4.tonhubapi.com" });
    this.treasuryAdmin = this.client4.open(new TreasuryAdmin(Address.parse(TREASURY_ADDRESS)));

    firebaseHelper.initFirebase();
  }

  async create(key: string): Promise<boolean> {
    if (this.sender.address) {
      await this.treasuryAdmin.sendCreatePool(
        this.sender,
        {
          value: MIN_GAS_FEE,
          nftItemAddress: Address.parse(key),
          ownerAddress: this.sender.address,
        },
      );
      return true;
    } else {
      throw new Error("Sender address does not exist.");
    }
  }

  async deposit(key: string, amount: string): Promise<boolean> {
    const poolAddress = await this.treasuryAdmin.getTreasuryPoolAddress(Address.parse(key));
    const treasuryPool = this.client4.open(new TreasuryPool(poolAddress));
    await treasuryPool.sendDeposit(this.sender, { value: MIN_GAS_FEE + safeNano(amount) });
    return true;
  }

  async withdraw(key: string, amount: string): Promise<boolean> {
    const poolAddress = await this.treasuryAdmin.getTreasuryPoolAddress(Address.parse(key));
    const treasuryPool = this.client4.open(new TreasuryPool(poolAddress));
    await treasuryPool.sendWithdraw(this.sender, { value: MIN_GAS_FEE, amount: safeNano(amount) })
    return true;
  }

}