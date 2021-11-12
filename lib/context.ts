import { createContext, Dispatch, SetStateAction } from "react";
import { IPost, ISub } from "./interfaces";

export const ThemeContext = createContext<{
  theme: string | null;
  setTheme: Dispatch<SetStateAction<string | null>>;
}>({
  theme: "",
  setTheme: () => {},
});

const PostsContext = createContext<{
  posts: IPost[];
  setPosts: Dispatch<SetStateAction<IPost[]>>;
}>({
  posts: [],
  setPosts: () => {},
});

const SubsContext = createContext<{
  subs: ISub[];
  setSubs: Dispatch<SetStateAction<ISub[]>>;
}>({
  subs: [],
  setSubs: () => {},
});
