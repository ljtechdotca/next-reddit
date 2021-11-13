import { Vote } from "@components";
import { fetchWrapper } from "@lib/helpers";
import { IPost } from "@lib/interfaces";
import Bookmark from "@public/icons/bookmark.svg";
import CornerUpRight from "@public/icons/corner-up-right.svg";
import Edit from "@public/icons/edit.svg";
import MessageSquare from "@public/icons/message-square.svg";
import Trash from "@public/icons/trash.svg";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./Post.module.scss";

export interface PostProps {
  active?: boolean;
  handleVote: (value: number) => number | void;
  post: IPost;
}

export const Post = ({ active, handleVote, post }: PostProps) => {
  const router = useRouter();

  function deletePost(id: string) {
    fetchWrapper
      .delete(`/api/posts/${id}`)
      .then(() => router.push(`/r/${post.sub.uri}`));
  }

  function handlePropagation(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div
      className={active ? styles.root__active : styles.root}
      onClick={
        active
          ? () => {}
          : () =>
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
          {active ? (
            <div className={styles.heading}>
              <h3>{post.name}</h3>
            </div>
          ) : (
            <Link href={`/r/${post.sub.uri}/comments/${post._id}/${post.uri}`}>
              <a className={styles.heading}>
                <h3>{post.name}</h3>
              </a>
            </Link>
          )}
        </div>
        <div className={styles.base}>
          {active && <div className={styles.body}>{post.body}</div>}
          <div>
            {!active && (
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
            )}
            {active && (
              <span onClick={handlePropagation}>
                <a className={styles.link} href={""}>
                  <span className={styles.icon}>
                    <Edit width={16} height={16} />
                  </span>
                  Edit
                </a>
              </span>
            )}
            {active && (
              <span onClick={handlePropagation}>
                <button
                  className={styles.button}
                  onClick={() => deletePost(post._id as string)}
                >
                  <span className={styles.icon}>
                    <Trash width={16} height={16} />
                  </span>
                  Delete
                </button>
              </span>
            )}
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
    </div>
  );
};
