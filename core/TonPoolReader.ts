import { TonClient4 } from "ton";
import { Address } from "ton-core";

import { TREASURY_ADDRESS } from "@/constants";

import firebaseHelper from "@/firebaseHelper";
import { FuncContract } from "@/types";
import { TreasuryPool } from "@/contracts/1ton/TreasuryPool";
import { TreasuryAdmin } from "@/contracts/1ton/TreasuryAdmin";
import { IPoolReader } from "./IPoolReader";

export class TonPoolReader implements IPoolReader {

  private client4: TonClient4;
  private treasuryAdmin: FuncContract<TreasuryAdmin>;

  constructor() {
    this.client4 = new TonClient4({ endpoint: "https://sandbox-v4.tonhubapi.com" });
    this.treasuryAdmin = this.client4.open(new TreasuryAdmin(Address.parse(TREASURY_ADDRESS)));

    firebaseHelper.initFirebase();
  }

  async poolCreated(key: string): Promise<boolean> {
    try {
      const address = await this.treasuryAdmin.getTreasuryPoolAddress(Address.parse(key));
      const pool = this.client4.open(new TreasuryPool(address));
      await pool.getPoolData();
      return true;
    } catch (e) {
    }
    return false;
  }

  async getBalance(key: string): Promise<string> {
    console.log("getBalance");
    try {
      const address = await this.treasuryAdmin.getTreasuryPoolAddress(Address.parse(key));
      const pool = this.client4.open(new TreasuryPool(address));
      const poolData = await pool.getPoolData();
      return poolData.balance.toString();
    } catch (e) {
    }
    return "0";
  }

}