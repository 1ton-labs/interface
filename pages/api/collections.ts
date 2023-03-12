// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import firebase from "firebase";
import { Address } from "ton";
import firebaseHelper from "@/firebaseHelper";
import { getBondRecords } from "@/core/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  firebaseHelper.initFirebase(); // required for next.js API

  // [GET] /api/collections
  if (req.method === "GET") {
    const snapshot = await firebase
      .database()
      .ref("/token_addresses")
      .once("value");
    const collections = snapshot.val();
    const addresses = Object.keys(collections);

    res.status(200).json({ count: addresses.length, addresses });
  } else if (req.method === "POST") {
    // [POST] /api/collections (for upserting collection details)
    const { address } = req.body;

    try {
      Address.parse(address);
    } catch {
      res.status(422).json({ message: "Unprocessable Entity" });
      return;
    }

    const records = await getBondRecords();
    const snapshot = await firebase.database().ref(`/metadata`).once("value");
    const metadata: any[] = snapshot.val();
    const items = await Promise.all(
      records.map((record, index) => {
        return {
          token_id: record.token_id,
          token_address: record.address.toString(),
          owner_address: record.owner_address?.toString(),
          ...metadata[index],
        };
      })
    );

    await firebase
      .database()
      .ref(`/token_addresses/${address}`)
      .set({ ...items });

    res.status(200).json(items);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
