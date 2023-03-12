import { NextApiRequest, NextApiResponse } from "next";
import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client/core";
import { PRIMARY_PROFILE } from "@/graphql/cyberconnect";

const CC_API = process.env.CC_API;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // [GET] /api/cc?address=${address}
  if (req.method === "GET") {
    const { address } = req.query;
    // https://docs.cyberconnect.me/api/profile/get-profile
    // https://github.com/cyberconnecthq/cc-content-app/blob/main/graphql/PrimaryProfile.ts

    const httpLink = new HttpLink({
      uri: CC_API,
      fetch,
    });
    const apolloClient = new ApolloClient({
      link: from([httpLink]),
      cache: new InMemoryCache(),
    });
    const request = {
      address,
    };
    try {
      const result = await apolloClient.query({
        query: PRIMARY_PROFILE,
        variables: request,
      });
      return res.status(200).json(result.data);
    } catch (e) {
      console.error(e);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}