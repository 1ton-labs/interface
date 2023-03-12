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
} from "../../../../common";

export interface CollectPaidMwInterface extends utils.Interface {
  functions: {
    "SPROUT_TREASURY()": FunctionFragment;
    "TREASURY()": FunctionFragment;
    "isFeeRedirect(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "postProcess(uint256,uint256,address,address,bytes)": FunctionFragment;
    "preProcess(uint256,uint256,address,address,bytes)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setEssenceMwData(uint256,uint256,bytes)": FunctionFragment;
    "setFeeRedirect(uint256,bool)": FunctionFragment;
    "setSproutTreasury(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "SPROUT_TREASURY"
      | "TREASURY"
      | "isFeeRedirect"
      | "owner"
      | "postProcess"
      | "preProcess"
      | "renounceOwnership"
      | "setEssenceMwData"
      | "setFeeRedirect"
      | "setSproutTreasury"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "SPROUT_TREASURY",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "TREASURY", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isFeeRedirect",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "postProcess",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "preProcess",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setEssenceMwData",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setFeeRedirect",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setSproutTreasury",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "SPROUT_TREASURY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "TREASURY", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isFeeRedirect",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "postProcess",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "preProcess", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setEssenceMwData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFeeRedirect",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSproutTreasury",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "CollectPaidMwSet(address,uint256,uint256,uint256,uint256,address,address,bool)": EventFragment;
    "FeeRedirect(uint256,bool)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CollectPaidMwSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FeeRedirect"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface CollectPaidMwSetEventObject {
  namespace: string;
  profileId: BigNumber;
  essenceId: BigNumber;
  totalSupply: BigNumber;
  amount: BigNumber;
  recipient: string;
  currency: string;
  subscribeRequired: boolean;
}
export type CollectPaidMwSetEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber, string, string, boolean],
  CollectPaidMwSetEventObject
>;

export type CollectPaidMwSetEventFilter =
  TypedEventFilter<CollectPaidMwSetEvent>;

export interface FeeRedirectEventObject {
  profileId: BigNumber;
  isRedirect: boolean;
}
export type FeeRedirectEvent = TypedEvent<
  [BigNumber, boolean],
  FeeRedirectEventObject
>;

export type FeeRedirectEventFilter = TypedEventFilter<FeeRedirectEvent>;

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

export interface CollectPaidMw extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CollectPaidMwInterface;

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
    SPROUT_TREASURY(overrides?: CallOverrides): Promise<[string]>;

    TREASURY(overrides?: CallOverrides): Promise<[string]>;

    isFeeRedirect(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    postProcess(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    preProcess(
      profileId: PromiseOrValue<BigNumberish>,
      essenceId: PromiseOrValue<BigNumberish>,
      collector: PromiseOrValue<string>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setEssenceMwData(
      profileId: PromiseOrValue<BigNumberish>,
      essenceId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFeeRedirect(
      profileId: PromiseOrValue<BigNumberish>,
      isRedirect: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setSproutTreasury(
      sproutTreasury: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  SPROUT_TREASURY(overrides?: CallOverrides): Promise<string>;

  TREASURY(overrides?: CallOverrides): Promise<string>;

  isFeeRedirect(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  postProcess(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<BigNumberish>,
    arg2: PromiseOrValue<string>,
    arg3: PromiseOrValue<string>,
    arg4: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  preProcess(
    profileId: PromiseOrValue<BigNumberish>,
    essenceId: PromiseOrValue<BigNumberish>,
    collector: PromiseOrValue<string>,
    arg3: PromiseOrValue<string>,
    arg4: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setEssenceMwData(
    profileId: PromiseOrValue<BigNumberish>,
    essenceId: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFeeRedirect(
    profileId: PromiseOrValue<BigNumberish>,
    isRedirect: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setSproutTreasury(
    sproutTreasury: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    SPROUT_TREASURY(overrides?: CallOverrides): Promise<string>;

    TREASURY(overrides?: CallOverrides): Promise<string>;

    isFeeRedirect(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    postProcess(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    preProcess(
      profileId: PromiseOrValue<BigNumberish>,
      essenceId: PromiseOrValue<BigNumberish>,
      collector: PromiseOrValue<string>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setEssenceMwData(
      profileId: PromiseOrValue<BigNumberish>,
      essenceId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    setFeeRedirect(
      profileId: PromiseOrValue<BigNumberish>,
      isRedirect: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    setSproutTreasury(
      sproutTreasury: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "CollectPaidMwSet(address,uint256,uint256,uint256,uint256,address,address,bool)"(
      namespace?: PromiseOrValue<string> | null,
      profileId?: PromiseOrValue<BigNumberish> | null,
      essenceId?: PromiseOrValue<BigNumberish> | null,
      totalSupply?: null,
      amount?: null,
      recipient?: null,
      currency?: null,
      subscribeRequired?: null
    ): CollectPaidMwSetEventFilter;
    CollectPaidMwSet(
      namespace?: PromiseOrValue<string> | null,
      profileId?: PromiseOrValue<BigNumberish> | null,
      essenceId?: PromiseOrValue<BigNumberish> | null,
      totalSupply?: null,
      amount?: null,
      recipient?: null,
      currency?: null,
      subscribeRequired?: null
    ): CollectPaidMwSetEventFilter;

    "FeeRedirect(uint256,bool)"(
      profileId?: PromiseOrValue<BigNumberish> | null,
      isRedirect?: null
    ): FeeRedirectEventFilter;
    FeeRedirect(
      profileId?: PromiseOrValue<BigNumberish> | null,
      isRedirect?: null
    ): FeeRedirectEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    SPROUT_TREASURY(overrides?: CallOverrides): Promise<BigNumber>;

    TREASURY(overrides?: CallOverrides): Promise<BigNumber>;

    isFeeRedirect(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    postProcess(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    preProcess(
      profileId: PromiseOrValue<BigNumberish>,
      essenceId: PromiseOrValue<BigNumberish>,
      collector: PromiseOrValue<string>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setEssenceMwData(
      profileId: PromiseOrValue<BigNumberish>,
      essenceId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFeeRedirect(
      profileId: PromiseOrValue<BigNumberish>,
      isRedirect: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setSproutTreasury(
      sproutTreasury: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    SPROUT_TREASURY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TREASURY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isFeeRedirect(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    postProcess(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    preProcess(
      profileId: PromiseOrValue<BigNumberish>,
      essenceId: PromiseOrValue<BigNumberish>,
      collector: PromiseOrValue<string>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setEssenceMwData(
      profileId: PromiseOrValue<BigNumberish>,
      essenceId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFeeRedirect(
      profileId: PromiseOrValue<BigNumberish>,
      isRedirect: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setSproutTreasury(
      sproutTreasury: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}