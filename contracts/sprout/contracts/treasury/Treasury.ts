/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface TreasuryInterface extends utils.Interface {
  functions: {
    "coinWhitelist(address)": FunctionFragment;
    "createPool(address,uint256,address)": FunctionFragment;
    "deposit(uint256,address,uint256)": FunctionFragment;
    "getPoolId(address,uint256)": FunctionFragment;
    "getPoolInfo(uint256)": FunctionFragment;
    "isActive(uint256)": FunctionFragment;
    "isNonceUsed(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "totalNumPool()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateCoinWhitelist(address,bool)": FunctionFragment;
    "whitelistWithdraw(address,uint256,uint256,bytes)": FunctionFragment;
    "withdraw(uint256,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "coinWhitelist"
      | "createPool"
      | "deposit"
      | "getPoolId"
      | "getPoolInfo"
      | "isActive"
      | "isNonceUsed"
      | "owner"
      | "renounceOwnership"
      | "totalNumPool"
      | "transferOwnership"
      | "updateCoinWhitelist"
      | "whitelistWithdraw"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "coinWhitelist",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "createPool",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolId",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolInfo",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "isActive",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "isNonceUsed",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalNumPool",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateCoinWhitelist",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "whitelistWithdraw",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "coinWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPoolId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPoolInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isActive", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isNonceUsed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalNumPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateCoinWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "whitelistWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Deposit(uint256,address,address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "PoolCreated(uint256,address,uint256)": EventFragment;
    "UpdateCoinWhitelist(address,address,bool)": EventFragment;
    "WhitelistWithdraw(address,address,uint256)": EventFragment;
    "Withdraw(uint256,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PoolCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateCoinWhitelist"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WhitelistWithdraw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export interface DepositEventObject {
  poolId: BigNumber;
  from: string;
  coin: string;
  amount: BigNumber;
}
export type DepositEvent = TypedEvent<
  [BigNumber, string, string, BigNumber],
  DepositEventObject
>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface PoolCreatedEventObject {
  poolId: BigNumber;
  nftAddress: string;
  nftId: BigNumber;
}
export type PoolCreatedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  PoolCreatedEventObject
>;

export type PoolCreatedEventFilter = TypedEventFilter<PoolCreatedEvent>;

export interface UpdateCoinWhitelistEventObject {
  caller: string;
  coin: string;
  newStatus: boolean;
}
export type UpdateCoinWhitelistEvent = TypedEvent<
  [string, string, boolean],
  UpdateCoinWhitelistEventObject
>;

export type UpdateCoinWhitelistEventFilter =
  TypedEventFilter<UpdateCoinWhitelistEvent>;

export interface WhitelistWithdrawEventObject {
  to: string;
  coin: string;
  amount: BigNumber;
}
export type WhitelistWithdrawEvent = TypedEvent<
  [string, string, BigNumber],
  WhitelistWithdrawEventObject
>;

export type WhitelistWithdrawEventFilter =
  TypedEventFilter<WhitelistWithdrawEvent>;

export interface WithdrawEventObject {
  poolId: BigNumber;
  to: string;
  coin: string;
  amount: BigNumber;
}
export type WithdrawEvent = TypedEvent<
  [BigNumber, string, string, BigNumber],
  WithdrawEventObject
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface Treasury extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TreasuryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    coinWhitelist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    createPool(
      _nftAddress: PromiseOrValue<string>,
      _nftId: PromiseOrValue<BigNumberish>,
      _coin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deposit(
      _poolId: PromiseOrValue<BigNumberish>,
      _coin: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getPoolId(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getPoolInfo(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, BigNumber] & {
        nft: string;
        nftId: BigNumber;
        coin: string;
        balances: BigNumber;
      }
    >;

    isActive(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isNonceUsed(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    totalNumPool(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateCoinWhitelist(
      _coin: PromiseOrValue<string>,
      _status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    whitelistWithdraw(
      _coin: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _nonce: PromiseOrValue<BigNumberish>,
      _depositProof: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      _poolId: PromiseOrValue<BigNumberish>,
      _coin: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  coinWhitelist(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  createPool(
    _nftAddress: PromiseOrValue<string>,
    _nftId: PromiseOrValue<BigNumberish>,
    _coin: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deposit(
    _poolId: PromiseOrValue<BigNumberish>,
    _coin: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getPoolId(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPoolInfo(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, string, BigNumber] & {
      nft: string;
      nftId: BigNumber;
      coin: string;
      balances: BigNumber;
    }
  >;

  isActive(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isNonceUsed(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  totalNumPool(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateCoinWhitelist(
    _coin: PromiseOrValue<string>,
    _status: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  whitelistWithdraw(
    _coin: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _nonce: PromiseOrValue<BigNumberish>,
    _depositProof: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    _poolId: PromiseOrValue<BigNumberish>,
    _coin: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    coinWhitelist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    createPool(
      _nftAddress: PromiseOrValue<string>,
      _nftId: PromiseOrValue<BigNumberish>,
      _coin: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deposit(
      _poolId: PromiseOrValue<BigNumberish>,
      _coin: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getPoolId(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolInfo(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, BigNumber] & {
        nft: string;
        nftId: BigNumber;
        coin: string;
        balances: BigNumber;
      }
    >;

    isActive(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isNonceUsed(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    totalNumPool(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateCoinWhitelist(
      _coin: PromiseOrValue<string>,
      _status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    whitelistWithdraw(
      _coin: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _nonce: PromiseOrValue<BigNumberish>,
      _depositProof: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    withdraw(
      _poolId: PromiseOrValue<BigNumberish>,
      _coin: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "Deposit(uint256,address,address,uint256)"(
      poolId?: PromiseOrValue<BigNumberish> | null,
      from?: PromiseOrValue<string> | null,
      coin?: PromiseOrValue<string> | null,
      amount?: null
    ): DepositEventFilter;
    Deposit(
      poolId?: PromiseOrValue<BigNumberish> | null,
      from?: PromiseOrValue<string> | null,
      coin?: PromiseOrValue<string> | null,
      amount?: null
    ): DepositEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "PoolCreated(uint256,address,uint256)"(
      poolId?: null,
      nftAddress?: PromiseOrValue<string> | null,
      nftId?: PromiseOrValue<BigNumberish> | null
    ): PoolCreatedEventFilter;
    PoolCreated(
      poolId?: null,
      nftAddress?: PromiseOrValue<string> | null,
      nftId?: PromiseOrValue<BigNumberish> | null
    ): PoolCreatedEventFilter;

    "UpdateCoinWhitelist(address,address,bool)"(
      caller?: PromiseOrValue<string> | null,
      coin?: PromiseOrValue<string> | null,
      newStatus?: PromiseOrValue<boolean> | null
    ): UpdateCoinWhitelistEventFilter;
    UpdateCoinWhitelist(
      caller?: PromiseOrValue<string> | null,
      coin?: PromiseOrValue<string> | null,
      newStatus?: PromiseOrValue<boolean> | null
    ): UpdateCoinWhitelistEventFilter;

    "WhitelistWithdraw(address,address,uint256)"(
      to?: PromiseOrValue<string> | null,
      coin?: PromiseOrValue<string> | null,
      amount?: null
    ): WhitelistWithdrawEventFilter;
    WhitelistWithdraw(
      to?: PromiseOrValue<string> | null,
      coin?: PromiseOrValue<string> | null,
      amount?: null
    ): WhitelistWithdrawEventFilter;

    "Withdraw(uint256,address,address,uint256)"(
      poolId?: PromiseOrValue<BigNumberish> | null,
      to?: PromiseOrValue<string> | null,
      coin?: PromiseOrValue<string> | null,
      amount?: null
    ): WithdrawEventFilter;
    Withdraw(
      poolId?: PromiseOrValue<BigNumberish> | null,
      to?: PromiseOrValue<string> | null,
      coin?: PromiseOrValue<string> | null,
      amount?: null
    ): WithdrawEventFilter;
  };

  estimateGas: {
    coinWhitelist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createPool(
      _nftAddress: PromiseOrValue<string>,
      _nftId: PromiseOrValue<BigNumberish>,
      _coin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deposit(
      _poolId: PromiseOrValue<BigNumberish>,
      _coin: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getPoolId(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolInfo(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isActive(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isNonceUsed(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    totalNumPool(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateCoinWhitelist(
      _coin: PromiseOrValue<string>,
      _status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    whitelistWithdraw(
      _coin: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _nonce: PromiseOrValue<BigNumberish>,
      _depositProof: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdraw(
      _poolId: PromiseOrValue<BigNumberish>,
      _coin: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    coinWhitelist(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createPool(
      _nftAddress: PromiseOrValue<string>,
      _nftId: PromiseOrValue<BigNumberish>,
      _coin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      _poolId: PromiseOrValue<BigNumberish>,
      _coin: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getPoolId(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolInfo(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isActive(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isNonceUsed(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    totalNumPool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateCoinWhitelist(
      _coin: PromiseOrValue<string>,
      _status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    whitelistWithdraw(
      _coin: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _nonce: PromiseOrValue<BigNumberish>,
      _depositProof: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      _poolId: PromiseOrValue<BigNumberish>,
      _coin: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
