// find posts from a subreddit
import { SECRET_KEY } from "@lib/constants";
import { handleError } from "@lib/helpers/api";
import { IToken, IUser } from "@lib/interfaces";
import { database } from "@lib/services";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { token },
  } = req;

  let decodeToken: IToken | string = {};
  let findUser: IUser | null = null;

  await database.connect();

  const { User } = require("@lib/models");

  try {
    switch (method) {
      case "GET":
        if (typeof token === "string") {
          decodeToken = jwt.verify(token, SECRET_KEY);
        }
        if (!decodeToken) throw new Error("No Token Found");
        if (typeof decodeToken !== "string") {
          findUser = await User.findById(decodeToken._id);
        } else throw new Error("Bad User Token");
        if (!findUser) throw new Error("No User Found");
        res.status(200).json({ status: true, user: findUser });
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
