import React from "react";
import styles from "./Container.module.scss";

export interface ContainerProps {}

export const Container = ({
  children,
}: React.PropsWithChildren<ContainerProps>) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};
