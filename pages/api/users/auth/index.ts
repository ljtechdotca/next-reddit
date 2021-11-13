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

  let findUser: IUser | null = null;
  let createUser: ISub | null = null;

  await database.connect();

  const { User } = require("@lib/models");

  try {
    switch (method) {
      case "POST":
        findUser = await User.findOne({ uri: body.uri });
        if (!findUser) throw new Error("This User Doesn't Exist");
        if (findUser.password !== body.password)
          throw new Error("Bad Login Credentials");
        const token = jwt.sign({ password: body.password }, SECRET_KEY, {
          expiresIn: "1m",
        });
        const cookie = handleCookies.create("user", token, 60, "/");
        res.setHeader("Set-Cookie", cookie);
        res.status(201).json({ user: findUser });
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

// Signing a token with 1 hour of expiration:

// jwt.sign({
//   exp: Math.floor(Date.now() / 1000) + (60 * 60),
//   data: 'foobar'
// }, 'secret');

// Another way to generate a token like this with this library is:

// jwt.sign({
//   data: 'foobar'
// }, 'secret', { expiresIn: 60 * 60 });

// //or even better:

// jwt.sign({
//   data: 'foobar'
// }, 'secret', { expiresIn: '1h' });
