export interface IPoolManager {
  create(key: string): Promise<boolean>;
  deposit(key: string, amount: string): Promise<boolean>;
  withdraw(key: string, amount: string): Promise<boolean>;
};
