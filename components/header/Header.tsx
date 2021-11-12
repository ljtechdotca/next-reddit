import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";

export interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const [active, setActive] = useState(false);

  // todo ThemeContext
  function handleTheme() {}

  function handleMenu(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setActive(!active);
  }

  function closeMenu() {
    setActive(false);
  }

  useEffect(() => {
    document.body.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <header className={styles.root}>
      <nav className={styles.container}>
        <Link href="/">
          <a className={styles.link}>✨ next-reddit</a>
        </Link>
        <button className={styles.menu} onClick={handleMenu}>
          🍔
        </button>
        {active && (
          <ul className={styles.list_menu} onClick={(e) => e.stopPropagation()}>
            <li className={styles.item}>
              <button className={styles.button_toggle} onClick={handleTheme}>
                🌛 Night Mode
                <input
                  className={styles.toggle}
                  type="checkbox"
                  value={active ? "checked" : "none"}
                  readOnly
                />
              </button>
            </li>
            <li className={styles.item}>
              <Link href="/awards">
                <a className={styles.link}>🔮 Awards</a>
              </Link>
            </li>
            <li className={styles.item}>
              <button className={styles.button}>
                <span>👤 Log In / Sign Out</span>
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};
