// find posts from a subreddit
import { handleError } from "@lib/helpers/api";
import { IPost } from "@lib/interfaces";
import { database } from "@lib/services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { post },
  } = req;

  let findPost: IPost | null = null;

  await database.connect();
  const { Post } = require("@lib/models");
  try {
    switch (method) {
      case "GET":
        if (typeof post === "string") {
          findPost = await Post.findById(post.split(",")[0]);
        }
        res.status(200).json({ post: findPost });
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
