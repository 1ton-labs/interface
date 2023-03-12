// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

import { getMetadata } from "@/core/metadata";

const cors = Cors({
  methods: ["GET"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const { id } = req.query;
  const itemId = parseInt(String(id).split(".")[0]);

  if (isNaN(itemId)) {
    res.status(404).json({ message: "Not Found" });
  } else {
    const metadata = await getMetadata(itemId);

    if (!metadata) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(200).json(metadata);
    }
  }
}
