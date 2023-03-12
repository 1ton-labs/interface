import { NextApiRequest, NextApiResponse } from "next";
import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client/core";
import { DefaultProfileDocument } from "@/graphql/lens/generated";

const LENS_API = process.env.LENS_API;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // [GET] /api/lens?address=${address}
  if (req.method === "GET") {
    const { address } = req.query;
    // https://docs.lens.xyz/docs/get-default-profile
    // https://github.com/lens-protocol/api-examples/blob/master/src/profile/get-default-profile.ts

    const httpLink = new HttpLink({
      uri: LENS_API,
      fetch,
    });
    const apolloClient = new ApolloClient({
      link: from([httpLink]),
      cache: new InMemoryCache(),
    });
    const request = {
      ethereumAddress: address,
    };
    const result = await apolloClient.query({
      query: DefaultProfileDocument,
      variables: {
        request,
      },
    });
    return res.status(200).json(result.data);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}