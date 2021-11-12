import {
  Banner,
  Context,
  Header,
  initialState,
  Post,
  reducer,
  Sidebar,
} from "@components";
import { IPost, ISub } from "@lib/interfaces";
import React from "react";
import styles from "./Layout.module.scss";

export interface LayoutProps {
  sub: ISub;
  posts: IPost[];
}

export const Layout = ({ sub, posts }: LayoutProps) => {
  return (
      <div className={styles.root}>
        <Header />
        <Banner sub={sub} />
        <div className={styles.container}>
          <div className={styles.posts}>
            {posts.map((post) => (
              <Post key={post._id as string} post={post} />
            ))}
          </div>
          <Sidebar sub={sub} />
        </div>
      </div>
  );
};
