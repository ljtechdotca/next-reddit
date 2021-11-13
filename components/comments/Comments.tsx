import { Vote } from "@components";
import { IPost } from "@lib/interfaces";
import Bookmark from "@public/icons/bookmark.svg";
import CornerUpRight from "@public/icons/corner-up-right.svg";
import styles from "./Comments.module.scss";
export interface CommentsProps {
  post: IPost;
}

export const Comments = ({ post }: CommentsProps) => {
  function handleVote(value: number) {}

  return (
    <div className={styles.root}>
      <div>
        <Vote handleVote={(value) => handleVote(value)} value={post.value} />
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span>
            <a className={styles.link} href={`/r/${post.sub.uri}`}>
              r/{post.sub.uri}
            </a>
          </span>
          • Posted by{" "}
          <span>
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
          <h3 className={styles.heading}>{post.name}</h3>
        </div>
        <div className={styles.base}>
          <div className={styles.body}>{post.body}</div>
          <div>
            <span>
              <a className={styles.link} href={""}>
                <span className={styles.icon}>
                  <CornerUpRight width={16} height={16} />
                </span>
                Share
              </a>
            </span>
            <span>
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
