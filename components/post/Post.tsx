import { Vote } from "@components";
import { IPost } from "@lib/interfaces";
import Link from "next/link";
import styles from "./Post.module.scss";
export interface PostProps {
  post: IPost;
}

export const Post = ({ post }: PostProps) => {
  return (
    <div className={styles.root}>
      <Vote post={post} />
      <div>
        <div className={styles.header}>
          created by
          <Link href={`/u/${post.user ?? "UNDEFINED_USER"}`}>
            <a>u/{post.user ?? "UNDEFINED_USER"}</a>
          </Link>
          {post.createdAt}
        </div>
        <div className={styles.container}>
          <Link href={`/r/${post.sub.uri}/comments/${post._id}/${post.uri}`}>
            <a>
              <h3>{post.name}</h3>
            </a>
          </Link>
        </div>
        <div className={styles.base}>
          <Link href={`/r/${post.sub.uri}/comments/${post._id}/${post.uri}`}>
            <a>☁ Comments</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
