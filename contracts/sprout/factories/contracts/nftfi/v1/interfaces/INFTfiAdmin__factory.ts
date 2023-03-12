/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  INFTfiAdmin,
  INFTfiAdminInterface,
} from "../../../../../contracts/nftfi/v1/interfaces/INFTfiAdmin";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newAdminFee",
        type: "uint256",
      },
    ],
    name: "AdminFeeUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "erc20",
        type: "address",
      },
    ],
    name: "erc20CurrencyIsWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nft",
        type: "address",
      },
    ],
    name: "nftContractIsWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newAdminFeeInBasisPoints",
        type: "uint256",
      },
    ],
    name: "updateAdminFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newMaximumLoanDuration",
        type: "uint256",
      },
    ],
    name: "updateMaximumLoanDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newMaximumNumberOfActiveLoans",
        type: "uint256",
      },
    ],
    name: "updateMaximumNumberOfActiveLoans",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_erc20Currency",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_setAsWhitelisted",
        type: "bool",
      },
    ],
    name: "whitelistERC20Currency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContract",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_setAsWhitelisted",
        type: "bool",
      },
    ],
    name: "whitelistNFTContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class INFTfiAdmin__factory {
  static readonly abi = _abi;
  static createInterface(): INFTfiAdminInterface {
    return new utils.Interface(_abi) as INFTfiAdminInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): INFTfiAdmin {
    return new Contract(address, _abi, signerOrProvider) as INFTfiAdmin;
  }
}
