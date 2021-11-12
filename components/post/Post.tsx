import { Vote } from "@components";
import { IPost, ISub } from "@lib/interfaces";
import Bookmark from "@public/icons/bookmark.svg";
import CornerUpRight from "@public/icons/corner-up-right.svg";
import MessageSquare from "@public/icons/message-square.svg";
import Link from "next/link";
import styles from "./Post.module.scss";

export interface PostProps {
  post: IPost;
}

export const Post = ({ post }: PostProps) => {
  function handleVote(value: number) {}

  return (
    <div className={styles.root}>
      <Vote handleVote={(value) => handleVote(value)} value={post.value} />
      <div>
        <div className={styles.header}>
          <Link href={`/r/${post.sub.uri}`}>
            <a className={styles.link}>r/{post.sub.uri}</a>
          </Link>{" "}
          • Posted by{" "}
          <Link href={`/u/${post.user ?? "UNDEFINED_USER"}`}>
            <a className={styles.link}>u/{post.user ?? "UNDEFINED_USER"}</a>
          </Link>{" "}
          {new Date(post.createdAt).toUTCString()}
        </div>
        <div className={styles.container}>
          <Link href={`/r/${post.sub.uri}/comments/${post._id}/${post.uri}`}>
            <a className={styles.link}>
              <h3>{post.name}</h3>
            </a>
          </Link>
        </div>
        <div className={styles.base}>
          <Link href={`/r/${post.sub.uri}/comments/${post._id}/${post.uri}`}>
            <a className={styles.link}>
              <span className={styles.icon}>
                <MessageSquare width={16} height={16} />
              </span>
              Comments
            </a>
          </Link>
          <Link href={`/r/${post.sub.uri}/comments/${post._id}/${post.uri}`}>
            <a className={styles.link}>
              <span className={styles.icon}>
                <CornerUpRight width={16} height={16} />
              </span>
              Share
            </a>
          </Link>
          <Link href={`/r/${post.sub.uri}/comments/${post._id}/${post.uri}`}>
            <a className={styles.link}>
              <span className={styles.icon}>
                <Bookmark width={16} height={16} />
              </span>
              Save
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
