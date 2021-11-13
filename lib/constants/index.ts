import { ISub } from "@lib/interfaces";

export const rAll: ISub = {
  _id: "0000",
  avatar: "",
  background: "dodgerblue",
  body: "Today's top content from hundreds of thousands of Reddit communities.",
  createdAt: "",
  moderators: [],
  name: "all",
  posts: [],
  rules: [],
  updatedAt: "",
  uri: "all",
};

export const rCreate: ISub = {
  _id: "1111",
  avatar: "",
  background: "dodgerblue",
  body: "When your account is more than 30 days old, and you have acquired a small amount of positive karma, then you can create a subreddit of your own.",
  createdAt: "",
  moderators: [],
  name: "all",
  posts: [],
  rules: [],
  updatedAt: "",
  uri: "all",
};

export const defaultSubs = [rAll, rCreate];
