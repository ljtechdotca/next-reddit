// finds or creates new users
import { SECRET_KEY } from "@lib/constants";
import { handleCookies } from "@lib/helpers";
import { handleError } from "@lib/helpers/api";
import { ISub, IUser } from "@lib/interfaces";
import { database } from "@lib/services";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  let findUsers: IUser[] = [];
  let createUser: ISub | null = null;

  await database.connect();

  const { User } = require("@lib/models");

  try {
    switch (method) {
      case "GET":
        findUsers = await User.find();
        res.status(200).json({ users: findUsers });
        break;
      case "POST":
        findUsers = await User.find({ uri: body.uri });
        if (findUsers.length > 0) throw new Error("This User Already Exists");
        createUser = await User.create(body);
        if (!createUser) throw new Error("Error Creating User");
        const token = jwt.sign(
          { _id: createUser._id, uri: body.uri },
          SECRET_KEY,
          { expiresIn: "1hr" }
        );
        const cookie = handleCookies.create("user", token, 3600, "/");
        res.setHeader("Set-Cookie", cookie);
        res.status(201).json({ user: createUser });
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
