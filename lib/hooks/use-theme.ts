import { getCookie } from "@lib/helpers/cookies";
import { setCookie } from "@lib/helpers/cookies/set-cookie";
import { useEffect } from "react";

export const useTheme = (reducer: any) => {
  useEffect(() => {
    let themeValue = getCookie("theme");
    !themeValue && setCookie("theme", "light");
    themeValue = !themeValue ? "light" : themeValue;
    document.body.className = "";
    document.body.classList.add(themeValue);
  }, [reducer]);
};
