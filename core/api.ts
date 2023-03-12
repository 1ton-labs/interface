import { getMetadata } from "@/core/metadata";
import { Metadata, NftItemRecord } from "@/types";
import { getBondRecords } from "./utils";

export async function getNftItem(tokenId: number): Promise<Metadata> {
  const item: Metadata = await getMetadata(tokenId);
  item.token_id = tokenId;
  return item;
}

export async function getNftItemByRecord(record: NftItemRecord) {
  const item: Metadata = await getNftItem(record.token_id);
  item.token_address = record.address;
  item.owner_address = record.owner_address ? record.owner_address.toString() : "";
  return item;
}

export async function getNftItems(): Promise<Metadata[]> {
  const records = await getBondRecords();
  const items = await Promise.all(records.map((record) => getNftItemByRecord(record)));
  return items;
}
