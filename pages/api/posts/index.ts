// finds or creates new subreddits
import { handleError } from "@lib/helpers/api";
import { IPost } from "@lib/interfaces";
import { database } from "@lib/services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  let findPosts: IPost[] = [];
  let createPost: IPost | null = null;

  await database.connect();
  
  const { Post } = require("@lib/models");

  try {
    switch (method) {
      case "GET":
        findPosts = await Post.find().populate("sub");
        findPosts.sort((a, b) => b.value - a.value);
        res.status(200).json({ posts: findPosts });
        break;
      case "POST":
        createPost = await Post.create(body);
        if (!createPost) throw new Error("Error Creating Post");
        res.status(201).json({ post: createPost });
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
