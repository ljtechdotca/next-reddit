import { IPost } from "@lib/interfaces";
import styles from "./Vote.module.scss";

export interface VoteProps {
  post: IPost;
}

export const Vote = ({ post }: VoteProps) => {
  return (
    <div className={styles.root}>
      <button onClick={() => {}}>+</button>
      <div className={styles.container}>{post.value}</div>
      <button onClick={() => {}}>-</button>
    </div>
  );
};
