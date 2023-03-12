import { Bond, Metadata } from "@/types";

export interface IBondManager {
  mint(parameter: BondParameter): Promise<boolean>;
  transfer(key: string, recipient: string): Promise<boolean>;
  burn(bond: Bond): Promise<boolean>;
  activate(bond: Bond): Promise<boolean>;
};

export type BondParameter = {
  metadata: Metadata;
};
