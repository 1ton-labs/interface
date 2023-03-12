/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ITreasuryEvents,
  ITreasuryEventsInterface,
} from "../../../../contracts/cyberconnect/interfaces/ITreasuryEvents";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "currency",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "preAllowed",
        type: "bool",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "newAllowed",
        type: "bool",
      },
    ],
    name: "AllowCurrency",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "preTreasuryAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "treasuryAddress",
        type: "address",
      },
    ],
    name: "SetTreasuryAddress",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint16",
        name: "preTreasuryFee",
        type: "uint16",
      },
      {
        indexed: true,
        internalType: "uint16",
        name: "treasuryFee",
        type: "uint16",
      },
    ],
    name: "SetTreasuryFee",
    type: "event",
  },
] as const;

export class ITreasuryEvents__factory {
  static readonly abi = _abi;
  static createInterface(): ITreasuryEventsInterface {
    return new utils.Interface(_abi) as ITreasuryEventsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ITreasuryEvents {
    return new Contract(address, _abi, signerOrProvider) as ITreasuryEvents;
  }
}