/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { BaseContract, Signer, utils } from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface ICyberEngineEventsInterface extends utils.Interface {
  functions: {};

  events: {
    "AllowEssenceMw(address,bool,bool)": EventFragment;
    "AllowProfileMw(address,bool,bool)": EventFragment;
    "AllowSubscribeMw(address,bool,bool)": EventFragment;
    "CreateNamespace(address,string,string)": EventFragment;
    "Initialize(address,address)": EventFragment;
    "SetProfileMw(address,address,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AllowEssenceMw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AllowProfileMw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AllowSubscribeMw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreateNamespace"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialize"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetProfileMw"): EventFragment;
}

export interface AllowEssenceMwEventObject {
  mw: string;
  preAllowed: boolean;
  newAllowed: boolean;
}
export type AllowEssenceMwEvent = TypedEvent<
  [string, boolean, boolean],
  AllowEssenceMwEventObject
>;

export type AllowEssenceMwEventFilter = TypedEventFilter<AllowEssenceMwEvent>;

export interface AllowProfileMwEventObject {
  mw: string;
  preAllowed: boolean;
  newAllowed: boolean;
}
export type AllowProfileMwEvent = TypedEvent<
  [string, boolean, boolean],
  AllowProfileMwEventObject
>;

export type AllowProfileMwEventFilter = TypedEventFilter<AllowProfileMwEvent>;

export interface AllowSubscribeMwEventObject {
  mw: string;
  preAllowed: boolean;
  newAllowed: boolean;
}
export type AllowSubscribeMwEvent = TypedEvent<
  [string, boolean, boolean],
  AllowSubscribeMwEventObject
>;

export type AllowSubscribeMwEventFilter =
  TypedEventFilter<AllowSubscribeMwEvent>;

export interface CreateNamespaceEventObject {
  namespace: string;
  name: string;
  symbol: string;
}
export type CreateNamespaceEvent = TypedEvent<
  [string, string, string],
  CreateNamespaceEventObject
>;

export type CreateNamespaceEventFilter = TypedEventFilter<CreateNamespaceEvent>;

export interface InitializeEventObject {
  owner: string;
  rolesAuthority: string;
}
export type InitializeEvent = TypedEvent<
  [string, string],
  InitializeEventObject
>;

export type InitializeEventFilter = TypedEventFilter<InitializeEvent>;

export interface SetProfileMwEventObject {
  namespace: string;
  mw: string;
  returnData: string;
}
export type SetProfileMwEvent = TypedEvent<
  [string, string, string],
  SetProfileMwEventObject
>;

export type SetProfileMwEventFilter = TypedEventFilter<SetProfileMwEvent>;

export interface ICyberEngineEvents extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ICyberEngineEventsInterface;

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
    "AllowEssenceMw(address,bool,bool)"(
      mw?: PromiseOrValue<string> | null,
      preAllowed?: PromiseOrValue<boolean> | null,
      newAllowed?: PromiseOrValue<boolean> | null
    ): AllowEssenceMwEventFilter;
    AllowEssenceMw(
      mw?: PromiseOrValue<string> | null,
      preAllowed?: PromiseOrValue<boolean> | null,
      newAllowed?: PromiseOrValue<boolean> | null
    ): AllowEssenceMwEventFilter;

    "AllowProfileMw(address,bool,bool)"(
      mw?: PromiseOrValue<string> | null,
      preAllowed?: PromiseOrValue<boolean> | null,
      newAllowed?: PromiseOrValue<boolean> | null
    ): AllowProfileMwEventFilter;
    AllowProfileMw(
      mw?: PromiseOrValue<string> | null,
      preAllowed?: PromiseOrValue<boolean> | null,
      newAllowed?: PromiseOrValue<boolean> | null
    ): AllowProfileMwEventFilter;

    "AllowSubscribeMw(address,bool,bool)"(
      mw?: PromiseOrValue<string> | null,
      preAllowed?: PromiseOrValue<boolean> | null,
      newAllowed?: PromiseOrValue<boolean> | null
    ): AllowSubscribeMwEventFilter;
    AllowSubscribeMw(
      mw?: PromiseOrValue<string> | null,
      preAllowed?: PromiseOrValue<boolean> | null,
      newAllowed?: PromiseOrValue<boolean> | null
    ): AllowSubscribeMwEventFilter;

    "CreateNamespace(address,string,string)"(
      namespace?: PromiseOrValue<string> | null,
      name?: null,
      symbol?: null
    ): CreateNamespaceEventFilter;
    CreateNamespace(
      namespace?: PromiseOrValue<string> | null,
      name?: null,
      symbol?: null
    ): CreateNamespaceEventFilter;

    "Initialize(address,address)"(
      owner?: PromiseOrValue<string> | null,
      rolesAuthority?: PromiseOrValue<string> | null
    ): InitializeEventFilter;
    Initialize(
      owner?: PromiseOrValue<string> | null,
      rolesAuthority?: PromiseOrValue<string> | null
    ): InitializeEventFilter;

    "SetProfileMw(address,address,bytes)"(
      namespace?: PromiseOrValue<string> | null,
      mw?: null,
      returnData?: null
    ): SetProfileMwEventFilter;
    SetProfileMw(
      namespace?: PromiseOrValue<string> | null,
      mw?: null,
      returnData?: null
    ): SetProfileMwEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}