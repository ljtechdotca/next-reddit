import { ISub } from "@lib/interfaces";
import Link from "next/link";
import styles from "./Sidebar.module.scss";
export interface SidebarProps {
  sub: ISub;
}

export const Sidebar = ({ sub }: SidebarProps) => {
  return (
    <aside className={styles.root}>
      <div className={styles.container}>
        <h2>About community</h2>
        <hr className={styles.break} />
        {sub.body}
      </div>
      <div className={styles.container}>
        {sub.uri === "all" ? (
          <Link href={`/r/create`}>
            <a className={styles.link__filled}>CREATE COMMUNITY</a>
          </Link>
        ) : (
          <>
            <Link href="/r/all">
              <a className={styles.link__outline}>Back to r/all</a>
            </Link>
            <Link href={`/r/${sub.uri}/create`}>
              <a className={styles.link__filled}>CREATE POST on r/{sub.uri}</a>
            </Link>
          </>
        )}
      </div>
    </aside>
  );
};
