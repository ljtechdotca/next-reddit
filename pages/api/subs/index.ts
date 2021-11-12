// finds or creates new subreddits
import { handleError } from "@lib/helpers/api";
import { ISub } from "@lib/interfaces";
import { database } from "@lib/services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  let findSubs: ISub[] = [];
  let createSub: ISub | null = null;
  let updateSub: ISub | null = null;

  await database.connect();
  const { Sub } = require("@lib/models");
  try {
    switch (method) {
      case "GET":
        findSubs = await Sub.find();
        res.status(200).json({ subs: findSubs });
        break;
      case "POST":
        // check for unique sub names
        findSubs = await Sub.find({ uri: body.uri });
        if (findSubs.length > 0) throw new Error("This Sub Already Exists");
        createSub = await Sub.create(body);
        if (!createSub) throw new Error("Error Creating Sub");
        res.status(201).json({ sub: createSub });
        break;
      case "PUT":
        updateSub = await Sub.findOneAndUpdate(
          { _id: body.subId },
          { $push: { posts: body.postId } }
        );
        if (!updateSub) throw new Error("Error Updating Sub");
        res.status(201).json({ sub: updateSub });
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
