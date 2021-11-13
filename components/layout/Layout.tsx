import { Banner, Post, Sidebar } from "@components";
import { IPost, ISub } from "@lib/interfaces";
import React from "react";
import styles from "./Layout.module.scss";

export interface LayoutProps {
  props: {
    sub: ISub;
    posts: IPost[];
  };
}

export const Layout = ({ props }: LayoutProps) => {
  const handleVote = (id: string, value: number) => {};

  return (
    <div className={styles.root}>
      <Banner sub={props.sub} />
      <div className={styles.container}>
        <div className={styles.posts}>
          {props.posts.map((post: IPost) => (
            <Post
              key={post._id as string}
              handleVote={(value) => handleVote(post._id as string, value)}
              post={post}
            />
          ))}
        </div>
        <Sidebar sub={props.sub} />
      </div>
    </div>
  );
};
