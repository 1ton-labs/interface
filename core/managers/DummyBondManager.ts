import { Bond } from "@/types";
import { BondParameter, IBondManager } from "./IBondManager";

export class DummyBondManager implements IBondManager {

  async mint(parameter: BondParameter): Promise<boolean> { return false; }

  async transfer(key: string, recipient: string): Promise<boolean> { return false; }

  async burn(bond: Bond): Promise<boolean> { return false; }

  async activate(bond: Bond): Promise<boolean> { return false; }

}