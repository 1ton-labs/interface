export interface ITokenManager {
  approveToken(contractAddress: string, amount: string): Promise<boolean>;
  wrapToken(amount: string): Promise<boolean>;
  withdrawToken(amount: string): Promise<boolean>;
}