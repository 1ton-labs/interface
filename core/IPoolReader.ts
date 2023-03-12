export interface IPoolReader {
  poolCreated(key: string): Promise<boolean>;
  getBalance(key: string): Promise<string>;
}
