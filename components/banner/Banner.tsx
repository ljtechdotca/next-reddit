import { ISub } from "@lib/interfaces";
import styles from "./Banner.module.scss";
export interface BannerProps {
  sub: ISub;
}

export const Banner = ({ sub }: BannerProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>{sub.name}</h1>
        <h2>r/{sub.uri}</h2>
      </div>
    </div>
  );
};
