import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveDataById, signUp } from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const profile = await retrieveDataById("users", "1");
    console.log(req);

    return res.status(200).json({ status: true, statusCode: 200, data: {} });
  }
}
