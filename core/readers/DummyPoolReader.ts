import { IPoolReader } from "./IPoolReader";

export class DummyPoolReader implements IPoolReader {

  async poolCreated(key: string): Promise<boolean> { return false; }

  async getBalance(key: string): Promise<string> { return "0"; }

}