import { Post } from "@components";
import { IPost } from "@lib/interfaces";
import styles from "./Comments.module.scss";
export interface CommentsProps {
  post: IPost;
}

export const Comments = ({ post }: CommentsProps) => {
  function handleVote(value: number) {}

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Post active post={post} />
      </div>
      <div className={styles.container}>
        comments heres
        <ul>
          <li>comment</li>
          <li>comment</li>
          <li>comment</li>
          <li>comment</li>
          <li>comment</li>
        </ul>
      </div>
    </div>
  );
};
