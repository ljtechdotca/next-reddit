import { handleCookies, handleSession } from "@lib/helpers";
import { useGlobal } from "@lib/hooks";
import ChevronDown from "@public/icons/chevron-down.svg";
import HelpCircle from "@public/icons/help-circle.svg";
import LogIn from "@public/icons/log-in.svg";
import Moon from "@public/icons/moon.svg";
import User from "@public/icons/user.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";

export interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const [active, setActive] = useState(false);
  const [{ theme, token }, dispatch] = useGlobal();

  useEffect(() => {
    let themeValue = handleCookies.get("theme");
    !themeValue && handleCookies.set("theme", "light", 0, "/");
    themeValue = !themeValue ? "light" : themeValue;
    dispatch({ type: "theme", payload: themeValue });
  }, [dispatch]);

  function handleTheme(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    let previousTheme = handleCookies.get("theme");
    const newTheme = previousTheme === "light" ? "dark" : "light";
    dispatch({ type: "theme", payload: newTheme });
    document.body.className = "";
    document.body.classList.add(newTheme);
    handleCookies.set("theme", newTheme, 0, "/");
  }

  function handleMenu(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setActive(!active);
  }

  function closeMenu() {
    setActive(false);
  }

  useEffect(() => {
    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <header className={styles.root}>
      <nav className={styles.container}>
        <Link href="/">
          <a className={styles.link}>✨ next-reddit</a>
        </Link>
        <button className={styles.menu} onClick={handleMenu}>
          <span className={styles.icon}>
            <User width={16} height={16} />
          </span>
          <span className={styles.icon}>
            <ChevronDown width={16} height={16} />
          </span>
        </button>
        {active && (
          <div className={styles.list} onClick={(e) => e.stopPropagation()}>
            <div className={styles.item}>
              <button className={styles.button} onClick={handleTheme}>
                <span className={styles.icon}>
                  <Moon width={16} height={16} />
                </span>
                Night Mode
                <input
                  checked={theme === "dark" ? true : false}
                  className={styles.toggle}
                  readOnly
                  type="checkbox"
                />
              </button>
            </div>
            <div className={styles.item}>
              <Link href="/awards">
                <a className={styles.link}>
                  <span className={styles.icon}>
                    <HelpCircle width={16} height={16} />
                  </span>
                  Help
                </a>
              </Link>
            </div>
            <hr className={styles.break} />
            <div className={styles.item}>
              {token ? (
                <button
                  className={styles.button}
                  onClick={() => handleSession.signOut(dispatch)}
                >
                  <span className={styles.icon}>
                    <LogIn width={16} height={16} />
                  </span>
                  Sign Out
                </button>
              ) : (
                <Link href="/login">
                  <a className={styles.link}>
                    <span className={styles.icon}>
                      <LogIn width={16} height={16} />
                    </span>
                    Log In / Sign Up
                  </a>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
