// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  description: string;
  image: string;
  cover_image: string;
  social_links: string[];
  external_url: string;
  marketplace: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    name: "Account NFTs",
    description: "Account NFTs",
    image: "https://avatars.githubusercontent.com/u/124552830",
    cover_image: "https://avatars.githubusercontent.com/u/124552830",
    social_links: [],
    external_url: "",
    marketplace: "1ton",
  });
}
