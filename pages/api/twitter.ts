import { NextApiRequest, NextApiResponse } from "next";

// const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
// const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET;
const TWITTER_API_ACCESS_TOKEN = process.env.TWITTER_API_ACCESS_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // [GET] /api/twitter?username=${username}
  if (req.method === "GET") {
    // https://developer.twitter.com/en/docs/authentication/oauth-2-0/application-only
    // const creds = Buffer.from(TWITTER_API_KEY + ":" + TWITTER_API_SECRET).toString("base64");
    // const url = "https://api.twitter.com/oauth2/token";
    // const headers = {
    //   "Host": "api.twitter.com",
    //   "User-Agent": "My Twitter App v1.0.23",
    //   "Authorization": `Basic ${creds}`,
    //   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //   "Content-Length": "29",
    //   "Accept-Encoding": "gzip",
    // };
    // const body = "grant_type=client_credentials";
    // const _res = await fetch(url, {
    //   method: "POST",
    //   headers,
    //   body,
    // })
    // const _data = await _res.json();
    // console.log(_data);

    if (TWITTER_API_ACCESS_TOKEN) {
      const { username } = req.query;
      // https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by-username-username
      const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics,profile_image_url`;
      const headers = {
        // "Host": "api.twitter.com",
        // "User-Agent": "My Twitter App v1.0.23",
        "Authorization": `Bearer ${TWITTER_API_ACCESS_TOKEN}`,
        // "Accept-Encoding": "gzip",
      };
      const _res = await fetch(url, {
        headers,
      });
      const _data = await _res.json();
      const profile = { ..._data };
      res.status(200).json(profile);
    } else {
      res.status(401);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}