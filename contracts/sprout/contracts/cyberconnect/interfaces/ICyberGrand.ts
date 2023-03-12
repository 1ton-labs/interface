/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
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
} from "../../../common";

export interface ICyberGrandInterface extends utils.Interface {
  functions: {
    "getSigner()": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "getSigner"): FunctionFragment;

  encodeFunctionData(functionFragment: "getSigner", values?: undefined): string;

  decodeFunctionResult(functionFragment: "getSigner", data: BytesLike): Result;

  events: {
    "ClaimGrand(address,uint256)": EventFragment;
    "Initialize(address,address,string,string,string)": EventFragment;
    "SetSigner(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ClaimGrand"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialize"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetSigner"): EventFragment;
}

export interface ClaimGrandEventObject {
  to: string;
  tokenId: BigNumber;
}
export type ClaimGrandEvent = TypedEvent<
  [string, BigNumber],
  ClaimGrandEventObject
>;

export type ClaimGrandEventFilter = TypedEventFilter<ClaimGrandEvent>;

export interface InitializeEventObject {
  owner: string;
  signer: string;
  name: string;
  symbol: string;
  uri: string;
}
export type InitializeEvent = TypedEvent<
  [string, string, string, string, string],
  InitializeEventObject
>;

export type InitializeEventFilter = TypedEventFilter<InitializeEvent>;

export interface SetSignerEventObject {
  preSigner: string;
  newSigner: string;
}
export type SetSignerEvent = TypedEvent<[string, string], SetSignerEventObject>;

export type SetSignerEventFilter = TypedEventFilter<SetSignerEvent>;

export interface ICyberGrand extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ICyberGrandInterface;

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
    getSigner(overrides?: CallOverrides): Promise<[string]>;
  };

  getSigner(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    getSigner(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "ClaimGrand(address,uint256)"(
      to?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): ClaimGrandEventFilter;
    ClaimGrand(
      to?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): ClaimGrandEventFilter;

    "Initialize(address,address,string,string,string)"(
      owner?: PromiseOrValue<string> | null,
      signer?: PromiseOrValue<string> | null,
      name?: null,
      symbol?: null,
      uri?: null
    ): InitializeEventFilter;
    Initialize(
      owner?: PromiseOrValue<string> | null,
      signer?: PromiseOrValue<string> | null,
      name?: null,
      symbol?: null,
      uri?: null
    ): InitializeEventFilter;

    "SetSigner(address,address)"(
      preSigner?: PromiseOrValue<string> | null,
      newSigner?: PromiseOrValue<string> | null
    ): SetSignerEventFilter;
    SetSigner(
      preSigner?: PromiseOrValue<string> | null,
      newSigner?: PromiseOrValue<string> | null
    ): SetSignerEventFilter;
  };

  estimateGas: {
    getSigner(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getSigner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
