import { Vote } from "@components";
import { IPost } from "@lib/interfaces";
import Bookmark from "@public/icons/bookmark.svg";
import CornerUpRight from "@public/icons/corner-up-right.svg";
import MessageSquare from "@public/icons/message-square.svg";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import styles from "./Post.module.scss";

export interface PostProps {
  active: boolean;
  post: IPost;
}

export const Post = ({ active, post }: PostProps) => {
  const router = useRouter();
  function handleVote(value: number) {}

  function handlePropagation(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div
      className={styles.root}
      onClick={() =>
        router.push(`/r/${post.sub.uri}/comments/${post._id}/${post.uri}`)
      }
    >
      <div onClick={handlePropagation}>
        <Vote handleVote={(value) => handleVote(value)} value={post.value} />
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span onClick={handlePropagation}>
            <a className={styles.link} href={`/r/${post.sub.uri}`}>
              r/{post.sub.uri}
            </a>
          </span>
          • Posted by{" "}
          <span onClick={handlePropagation}>
            <a
              className={styles.link}
              href={`/u/${post.user ?? "UNDEFINED_USER"}`}
            >
              u/{post.user ?? "UNDEFINED_USER"}
            </a>
          </span>
          {new Date(post.createdAt).toUTCString()}
        </div>
        <div className={styles.content}>
          <Link href={`/r/${post.sub.uri}/comments/${post._id}/${post.uri}`}>
            <a className={styles.heading}>
              <h3>{post.name}</h3>
            </a>
          </Link>
        </div>
        <div className={styles.base}>
          <span onClick={handlePropagation}>
            <a
              className={styles.link}
              href={`/r/${post.sub.uri}/comments/${post._id}/${post.uri}`}
            >
              <span className={styles.icon}>
                <MessageSquare width={16} height={16} />
              </span>
              Comments
            </a>
          </span>
          <span onClick={handlePropagation}>
            <a className={styles.link} href={""}>
              <span className={styles.icon}>
                <CornerUpRight width={16} height={16} />
              </span>
              Share
            </a>
          </span>
          <span onClick={handlePropagation}>
            <a className={styles.link} href={""}>
              <span className={styles.icon}>
                <Bookmark width={16} height={16} />
              </span>
              Save
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
