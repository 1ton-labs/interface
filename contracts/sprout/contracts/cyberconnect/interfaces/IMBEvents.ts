/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  Signer,
  utils,
} from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface IMBEventsInterface extends utils.Interface {
  functions: {};

  events: {
    "Initialize(address,address,string,string,string)": EventFragment;
    "OpenBox(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialize"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OpenBox"): EventFragment;
}

export interface InitializeEventObject {
  owner: string;
  boxAddr: string;
  name: string;
  symbol: string;
  uri: string;
}
export type InitializeEvent = TypedEvent<
  [string, string, string, string, string],
  InitializeEventObject
>;

export type InitializeEventFilter = TypedEventFilter<InitializeEvent>;

export interface OpenBoxEventObject {
  to: string;
  boxId: BigNumber;
}
export type OpenBoxEvent = TypedEvent<[string, BigNumber], OpenBoxEventObject>;

export type OpenBoxEventFilter = TypedEventFilter<OpenBoxEvent>;

export interface IMBEvents extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IMBEventsInterface;

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

  functions: {};

  callStatic: {};

  filters: {
    "Initialize(address,address,string,string,string)"(
      owner?: PromiseOrValue<string> | null,
      boxAddr?: PromiseOrValue<string> | null,
      name?: null,
      symbol?: null,
      uri?: null
    ): InitializeEventFilter;
    Initialize(
      owner?: PromiseOrValue<string> | null,
      boxAddr?: PromiseOrValue<string> | null,
      name?: null,
      symbol?: null,
      uri?: null
    ): InitializeEventFilter;

    "OpenBox(address,uint256)"(
      to?: PromiseOrValue<string> | null,
      boxId?: PromiseOrValue<BigNumberish> | null
    ): OpenBoxEventFilter;
    OpenBox(
      to?: PromiseOrValue<string> | null,
      boxId?: PromiseOrValue<BigNumberish> | null
    ): OpenBoxEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}