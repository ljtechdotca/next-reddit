import { ISub } from "@lib/interfaces";
import styles from "./Sidebar.module.scss";
export interface SidebarProps {
  sub: ISub;
}

export const Sidebar = ({ sub }: SidebarProps) => {
  return (
    <aside className={styles.root}>
      <div className={styles.container}>
        <h2>About community</h2>
        {sub.body}
      </div>
    </aside>
  );
};
