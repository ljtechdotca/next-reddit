// finds or deletes a sub by its mongo _id
import { handleError } from "@lib/helpers/api";
import { ISub } from "@lib/interfaces";
import { database } from "@lib/services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    query: { sub },
  } = req;

  let findSub: ISub | null = null;

  await database.connect();
  
  const { Sub } = require("@lib/models");

  try {
    switch (method) {
      case "GET":
        findSub = await Sub.findOne({ uri: sub }).populate("posts");
        res.status(200).json({ sub: findSub });
        break;
      case "DELETE":
        findSub = await Sub.findOne({ uri: sub });
        if (findSub) throw new Error("Sub Exists");
        const deleteSub = await Sub.deleteOne(body);
        res.status(200).json({ sub: deleteSub });
        break;
      default:
        res.status(405).end();
        break;
    }
  } catch (error) {
    handleError(error, res);
  }

  database.disconnect();
}
