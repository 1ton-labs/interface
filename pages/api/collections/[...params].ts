// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import firebase from "firebase";

import firebaseHelper from "@/firebaseHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  firebaseHelper.initFirebase(); // required for next.js API
  const { params } = req.query;

  if (req.method === "GET" && params) {
    // [GET] /api/collections/{address}
    if (params.length === 1) {
      const address = params[0];
      const snapshot = await firebase
        .database()
        .ref(`/token_addresses/${address}`)
        .once("value");
      const items: any[] = snapshot.val();

      if (items) {
        const response = items.map((item: string, index) => {
          return { token_id: index, address: item };
        });
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    } else if (params.length === 2) {
      // [GET] /api/collections/{address}/{token_id}
      const collectionAddress = params[0];
      const id = params[1];

      const snapshot = await firebase
        .database()
        .ref(`/token_addresses/${collectionAddress}/${id}`)
        .once("value");
      const address: string = snapshot.val();

      if (address) res.status(200).json({ address });
      else res.status(404).json({ message: "Not Found" });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
