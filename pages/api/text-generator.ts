import { NextApiRequest, NextApiResponse } from "next";

import NLPCloudClient from 'nlpcloud';
const NLP_CLOUD_API_ACCESS_TOKEN = process.env.NLP_CLOUD_API_ACCESS_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "GET") {
    if (!NLP_CLOUD_API_ACCESS_TOKEN) {
      res.status(500).json({});
    } else {
      const client = new NLPCloudClient('finetuned-gpt-neox-20b', NLP_CLOUD_API_ACCESS_TOKEN, true)
      console.log(`NLP_CLOUD_API_ACCESS_TOKEN = ${JSON.stringify(NLP_CLOUD_API_ACCESS_TOKEN)}`);

      let { type, start, name } = req.query;
      let data;
      try {
        if (type == 'bio') {
          // if (!start) {
          //   start = "I'm Alice. I'm a youtuber with 150k subscribers and average 50k views per video. Most of my videos are about computer science. "
          // }
          // const question = `${start}. Please directly write a biography example in first person point of view under 150 words `;
          const question = `Please write a biography of ${name} in the first person point of view. Under 100 words.`
          console.log(`question = ${question}`);
          const response = await client.chatbot(`${question}`, `The human try to get a business loan. The AI need to help human write a biography example to convince others that human is honest and reliable. The AI can not use words 'honest', 'reliable' directly in biography example. `, []);
          data = response.data
        } else if (type == 'plan') {
          // if (!start) {
          //   start = "I'm a youtuber with 150k subscribers and average 50k views per video. Most of my videos are about computer science. I want to rent a larger workspace and buy additional equipment. Seeking a loan of 3000$"
          // }
          // const question = `${start}. Please directly write a business plan example under 150 words with assumptions of rental costs, channel growth and revenue growth`;
          const question = `Please write a business plan for ${name} to do a startup in 100 words.`
          console.log(`question = ${question}`);

          const response = await client.chatbot(`${question}`, 'The human try to get a business loan. The AI need to help human write a business plan ', []);
          data = response.data
        }
        console.log(`text = ${data?.response}`);
        res.status(200).json({ text: data?.response });
      } catch (err) {
        console.error(err);
        res.status(200).json({ text: "" });
      }

    }

  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }

}