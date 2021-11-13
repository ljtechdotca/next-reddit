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
    body,
    method,
    query: { post },
  } = req;

  const id = post.toString().split(",")[0];

  let findPost: IPost | null = null;
  let updatePost: IPost | null = null;
  let deletePost: IPost | null = null;

  await database.connect();
  
  const { Post } = require("@lib/models");

  try {
    switch (method) {
      case "GET":
        if (typeof post === "string") {
          findPost = await Post.findById(id);
        }
        res.status(200).json({ post: findPost });
        break;
      case "PUT":
        updatePost = await Post.findByIdAndUpdate(id, {
          $inc: {
            value: body,
          },
        });
        if (!updatePost) throw new Error("No Was Post Updated");
        res
          .status(200)
          .json({ post: { ...updatePost, value: updatePost.value + body } });
        break;
      case "DELETE":
        deletePost = await Post.findByIdAndDelete(id);
        // todo: delete relations that post has?
        res.status(200).json({ post: deletePost });
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
