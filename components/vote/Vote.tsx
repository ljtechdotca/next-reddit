import ChevronDown from "@public/icons/chevron-down.svg";
import ChevronUp from "@public/icons/chevron-up.svg";
import styles from "./Vote.module.scss";

export interface VoteProps {
  handleVote: (value: number) => number | void;
  value: number;
}

export const Vote = ({ handleVote, value }: VoteProps) => {
  return (
    <div className={styles.root}>
      <button className={styles.button_up} onClick={() => handleVote(1)}>
        <span className={styles.icon}>
          <ChevronUp width={16} height={16} />
        </span>
      </button>
      <div className={styles.container}>{value ?? 0}</div>
      <button className={styles.button_down} onClick={() => handleVote(-1)}>
        <span className={styles.icon}>
          <ChevronDown width={16} height={16} />
        </span>
      </button>
    </div>
  );
};
