import { Metadata, NftItemRecord } from "@/types";

export interface IBondReader {
  getBond(tokenId: string): Promise<Metadata>;
  getBondRecords(): Promise<NftItemRecord[]>;
  getBondActivatedTime(tokenId: string): Promise<number>;
}
