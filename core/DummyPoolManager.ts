import { IPoolManager } from "./IPoolManager";

export class DummyPoolManager implements IPoolManager {

  async create(key: string): Promise<boolean> { return false; }

  async deposit(key: string, amount: string): Promise<boolean> { return false; }

  async withdraw(key: string, amount: string): Promise<boolean> { return false; }

}