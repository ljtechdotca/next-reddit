import { handleCookies } from "@lib/helpers";
import { useEffect } from "react";

export const useTheme = () => {
  useEffect(() => {
    let themeValue = handleCookies.get("theme");
    !themeValue && handleCookies.set("theme", "light", 0, "/");
    themeValue = !themeValue ? "light" : themeValue;
    document.body.className = "";
    document.body.classList.add(themeValue);
  }, []);
};
