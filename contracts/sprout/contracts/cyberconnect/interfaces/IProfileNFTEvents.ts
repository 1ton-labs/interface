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

export interface IProfileNFTEventsInterface extends utils.Interface {
  functions: {};

  events: {
    "CollectEssence(address,uint256,uint256,uint256,bytes,bytes)": EventFragment;
    "CreateProfile(address,uint256,string,string,string)": EventFragment;
    "DeployEssenceNFT(uint256,uint256,address)": EventFragment;
    "DeploySubscribeNFT(uint256,address)": EventFragment;
    "Initialize(address,string,string)": EventFragment;
    "RegisterEssence(uint256,uint256,string,string,string,address,bytes)": EventFragment;
    "SetAvatar(uint256,string)": EventFragment;
    "SetEssenceData(uint256,uint256,string,address,bytes)": EventFragment;
    "SetMetadata(uint256,string)": EventFragment;
    "SetNFTDescriptor(address)": EventFragment;
    "SetNamespaceOwner(address,address)": EventFragment;
    "SetOperatorApproval(uint256,address,bool,bool)": EventFragment;
    "SetPrimaryProfile(address,uint256)": EventFragment;
    "SetSubscribeData(uint256,string,address,bytes)": EventFragment;
    "Subscribe(address,uint256[],bytes[],bytes[])": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CollectEssence"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreateProfile"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DeployEssenceNFT"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DeploySubscribeNFT"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialize"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RegisterEssence"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetAvatar"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetEssenceData"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetMetadata"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetNFTDescriptor"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetNamespaceOwner"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetOperatorApproval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetPrimaryProfile"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetSubscribeData"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Subscribe"): EventFragment;
}

export interface CollectEssenceEventObject {
  collector: string;
  profileId: BigNumber;
  essenceId: BigNumber;
  tokenId: BigNumber;
  preData: string;
  postData: string;
}
export type CollectEssenceEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, string, string],
  CollectEssenceEventObject
>;

export type CollectEssenceEventFilter = TypedEventFilter<CollectEssenceEvent>;

export interface CreateProfileEventObject {
  to: string;
  profileId: BigNumber;
  handle: string;
  avatar: string;
  metadata: string;
}
export type CreateProfileEvent = TypedEvent<
  [string, BigNumber, string, string, string],
  CreateProfileEventObject
>;

export type CreateProfileEventFilter = TypedEventFilter<CreateProfileEvent>;

export interface DeployEssenceNFTEventObject {
  profileId: BigNumber;
  essenceId: BigNumber;
  essenceNFT: string;
}
export type DeployEssenceNFTEvent = TypedEvent<
  [BigNumber, BigNumber, string],
  DeployEssenceNFTEventObject
>;

export type DeployEssenceNFTEventFilter =
  TypedEventFilter<DeployEssenceNFTEvent>;

export interface DeploySubscribeNFTEventObject {
  profileId: BigNumber;
  subscribeNFT: string;
}
export type DeploySubscribeNFTEvent = TypedEvent<
  [BigNumber, string],
  DeploySubscribeNFTEventObject
>;

export type DeploySubscribeNFTEventFilter =
  TypedEventFilter<DeploySubscribeNFTEvent>;

export interface InitializeEventObject {
  owner: string;
  name: string;
  symbol: string;
}
export type InitializeEvent = TypedEvent<
  [string, string, string],
  InitializeEventObject
>;

export type InitializeEventFilter = TypedEventFilter<InitializeEvent>;

export interface RegisterEssenceEventObject {
  profileId: BigNumber;
  essenceId: BigNumber;
  name: string;
  symbol: string;
  essenceTokenURI: string;
  essenceMw: string;
  prepareReturnData: string;
}
export type RegisterEssenceEvent = TypedEvent<
  [BigNumber, BigNumber, string, string, string, string, string],
  RegisterEssenceEventObject
>;

export type RegisterEssenceEventFilter = TypedEventFilter<RegisterEssenceEvent>;

export interface SetAvatarEventObject {
  profileId: BigNumber;
  newAvatar: string;
}
export type SetAvatarEvent = TypedEvent<
  [BigNumber, string],
  SetAvatarEventObject
>;

export type SetAvatarEventFilter = TypedEventFilter<SetAvatarEvent>;

export interface SetEssenceDataEventObject {
  profileId: BigNumber;
  essenceId: BigNumber;
  tokenURI: string;
  mw: string;
  prepareReturnData: string;
}
export type SetEssenceDataEvent = TypedEvent<
  [BigNumber, BigNumber, string, string, string],
  SetEssenceDataEventObject
>;

export type SetEssenceDataEventFilter = TypedEventFilter<SetEssenceDataEvent>;

export interface SetMetadataEventObject {
  profileId: BigNumber;
  newMetadata: string;
}
export type SetMetadataEvent = TypedEvent<
  [BigNumber, string],
  SetMetadataEventObject
>;

export type SetMetadataEventFilter = TypedEventFilter<SetMetadataEvent>;

export interface SetNFTDescriptorEventObject {
  newDescriptor: string;
}
export type SetNFTDescriptorEvent = TypedEvent<
  [string],
  SetNFTDescriptorEventObject
>;

export type SetNFTDescriptorEventFilter =
  TypedEventFilter<SetNFTDescriptorEvent>;

export interface SetNamespaceOwnerEventObject {
  preOwner: string;
  newOwner: string;
}
export type SetNamespaceOwnerEvent = TypedEvent<
  [string, string],
  SetNamespaceOwnerEventObject
>;

export type SetNamespaceOwnerEventFilter =
  TypedEventFilter<SetNamespaceOwnerEvent>;

export interface SetOperatorApprovalEventObject {
  profileId: BigNumber;
  operator: string;
  prevApproved: boolean;
  approved: boolean;
}
export type SetOperatorApprovalEvent = TypedEvent<
  [BigNumber, string, boolean, boolean],
  SetOperatorApprovalEventObject
>;

export type SetOperatorApprovalEventFilter =
  TypedEventFilter<SetOperatorApprovalEvent>;

export interface SetPrimaryProfileEventObject {
  user: string;
  profileId: BigNumber;
}
export type SetPrimaryProfileEvent = TypedEvent<
  [string, BigNumber],
  SetPrimaryProfileEventObject
>;

export type SetPrimaryProfileEventFilter =
  TypedEventFilter<SetPrimaryProfileEvent>;

export interface SetSubscribeDataEventObject {
  profileId: BigNumber;
  tokenURI: string;
  mw: string;
  prepareReturnData: string;
}
export type SetSubscribeDataEvent = TypedEvent<
  [BigNumber, string, string, string],
  SetSubscribeDataEventObject
>;

export type SetSubscribeDataEventFilter =
  TypedEventFilter<SetSubscribeDataEvent>;

export interface SubscribeEventObject {
  sender: string;
  profileIds: BigNumber[];
  preDatas: string[];
  postDatas: string[];
}
export type SubscribeEvent = TypedEvent<
  [string, BigNumber[], string[], string[]],
  SubscribeEventObject
>;

export type SubscribeEventFilter = TypedEventFilter<SubscribeEvent>;

export interface IProfileNFTEvents extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IProfileNFTEventsInterface;

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
    "CollectEssence(address,uint256,uint256,uint256,bytes,bytes)"(
      collector?: PromiseOrValue<string> | null,
      profileId?: PromiseOrValue<BigNumberish> | null,
      essenceId?: PromiseOrValue<BigNumberish> | null,
      tokenId?: null,
      preData?: null,
      postData?: null
    ): CollectEssenceEventFilter;
    CollectEssence(
      collector?: PromiseOrValue<string> | null,
      profileId?: PromiseOrValue<BigNumberish> | null,
      essenceId?: PromiseOrValue<BigNumberish> | null,
      tokenId?: null,
      preData?: null,
      postData?: null
    ): CollectEssenceEventFilter;

    "CreateProfile(address,uint256,string,string,string)"(
      to?: PromiseOrValue<string> | null,
      profileId?: PromiseOrValue<BigNumberish> | null,
      handle?: null,
      avatar?: null,
      metadata?: null
    ): CreateProfileEventFilter;
    CreateProfile(
      to?: PromiseOrValue<string> | null,
      profileId?: PromiseOrValue<BigNumberish> | null,
      handle?: null,
      avatar?: null,
      metadata?: null
    ): CreateProfileEventFilter;

    "DeployEssenceNFT(uint256,uint256,address)"(
      profileId?: PromiseOrValue<BigNumberish> | null,
      essenceId?: PromiseOrValue<BigNumberish> | null,
      essenceNFT?: PromiseOrValue<string> | null
    ): DeployEssenceNFTEventFilter;
    DeployEssenceNFT(
      profileId?: PromiseOrValue<BigNumberish> | null,
      essenceId?: PromiseOrValue<BigNumberish> | null,
      essenceNFT?: PromiseOrValue<string> | null
    ): DeployEssenceNFTEventFilter;

    "DeploySubscribeNFT(uint256,address)"(
      profileId?: PromiseOrValue<BigNumberish> | null,
      subscribeNFT?: PromiseOrValue<string> | null
    ): DeploySubscribeNFTEventFilter;
    DeploySubscribeNFT(
      profileId?: PromiseOrValue<BigNumberish> | null,
      subscribeNFT?: PromiseOrValue<string> | null
    ): DeploySubscribeNFTEventFilter;

    "Initialize(address,string,string)"(
      owner?: PromiseOrValue<string> | null,
      name?: null,
      symbol?: null
    ): InitializeEventFilter;
    Initialize(
      owner?: PromiseOrValue<string> | null,
      name?: null,
      symbol?: null
    ): InitializeEventFilter;

    "RegisterEssence(uint256,uint256,string,string,string,address,bytes)"(
      profileId?: PromiseOrValue<BigNumberish> | null,
      essenceId?: PromiseOrValue<BigNumberish> | null,
      name?: null,
      symbol?: null,
      essenceTokenURI?: null,
      essenceMw?: null,
      prepareReturnData?: null
    ): RegisterEssenceEventFilter;
    RegisterEssence(
      profileId?: PromiseOrValue<BigNumberish> | null,
      essenceId?: PromiseOrValue<BigNumberish> | null,
      name?: null,
      symbol?: null,
      essenceTokenURI?: null,
      essenceMw?: null,
      prepareReturnData?: null
    ): RegisterEssenceEventFilter;

    "SetAvatar(uint256,string)"(
      profileId?: PromiseOrValue<BigNumberish> | null,
      newAvatar?: null
    ): SetAvatarEventFilter;
    SetAvatar(
      profileId?: PromiseOrValue<BigNumberish> | null,
      newAvatar?: null
    ): SetAvatarEventFilter;

    "SetEssenceData(uint256,uint256,string,address,bytes)"(
      profileId?: PromiseOrValue<BigNumberish> | null,
      essenceId?: PromiseOrValue<BigNumberish> | null,
      tokenURI?: null,
      mw?: null,
      prepareReturnData?: null
    ): SetEssenceDataEventFilter;
    SetEssenceData(
      profileId?: PromiseOrValue<BigNumberish> | null,
      essenceId?: PromiseOrValue<BigNumberish> | null,
      tokenURI?: null,
      mw?: null,
      prepareReturnData?: null
    ): SetEssenceDataEventFilter;

    "SetMetadata(uint256,string)"(
      profileId?: PromiseOrValue<BigNumberish> | null,
      newMetadata?: null
    ): SetMetadataEventFilter;
    SetMetadata(
      profileId?: PromiseOrValue<BigNumberish> | null,
      newMetadata?: null
    ): SetMetadataEventFilter;

    "SetNFTDescriptor(address)"(
      newDescriptor?: PromiseOrValue<string> | null
    ): SetNFTDescriptorEventFilter;
    SetNFTDescriptor(
      newDescriptor?: PromiseOrValue<string> | null
    ): SetNFTDescriptorEventFilter;

    "SetNamespaceOwner(address,address)"(
      preOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): SetNamespaceOwnerEventFilter;
    SetNamespaceOwner(
      preOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): SetNamespaceOwnerEventFilter;

    "SetOperatorApproval(uint256,address,bool,bool)"(
      profileId?: PromiseOrValue<BigNumberish> | null,
      operator?: PromiseOrValue<string> | null,
      prevApproved?: null,
      approved?: null
    ): SetOperatorApprovalEventFilter;
    SetOperatorApproval(
      profileId?: PromiseOrValue<BigNumberish> | null,
      operator?: PromiseOrValue<string> | null,
      prevApproved?: null,
      approved?: null
    ): SetOperatorApprovalEventFilter;

    "SetPrimaryProfile(address,uint256)"(
      user?: PromiseOrValue<string> | null,
      profileId?: PromiseOrValue<BigNumberish> | null
    ): SetPrimaryProfileEventFilter;
    SetPrimaryProfile(
      user?: PromiseOrValue<string> | null,
      profileId?: PromiseOrValue<BigNumberish> | null
    ): SetPrimaryProfileEventFilter;

    "SetSubscribeData(uint256,string,address,bytes)"(
      profileId?: PromiseOrValue<BigNumberish> | null,
      tokenURI?: null,
      mw?: null,
      prepareReturnData?: null
    ): SetSubscribeDataEventFilter;
    SetSubscribeData(
      profileId?: PromiseOrValue<BigNumberish> | null,
      tokenURI?: null,
      mw?: null,
      prepareReturnData?: null
    ): SetSubscribeDataEventFilter;

    "Subscribe(address,uint256[],bytes[],bytes[])"(
      sender?: PromiseOrValue<string> | null,
      profileIds?: null,
      preDatas?: null,
      postDatas?: null
    ): SubscribeEventFilter;
    Subscribe(
      sender?: PromiseOrValue<string> | null,
      profileIds?: null,
      preDatas?: null,
      postDatas?: null
    ): SubscribeEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}