import { ITokenManager } from "./ITokenManager";

export class DummyTokenManager implements ITokenManager {

  async approveToken(contractAddress: string, amount: string): Promise<boolean> {
    return false;
  }

  async wrapToken(amount: string): Promise<boolean> {
    return false;
  }

  async withdrawToken(amount: string): Promise<boolean> {
    return false;
  }
}