/** @format */

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface PropsThemes {
  onChange: (type: boolean) => void;
}

export const useThemes = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const media = window?.matchMedia("(prefers-color-scheme: dark)");
    if (media.matches) {
      //深色模式
      document.documentElement.setAttribute("theme", "dark");
    } else {
      document.documentElement.setAttribute("theme", "light");
    }
    let callback = (e: any) => {
      let prefersDarkMode = e.matches;
      setTheme(prefersDarkMode ? "dark" : "light");
      if (prefersDarkMode) {
        // 深色模式
        document.documentElement.setAttribute("theme", "dark");
      } else {
        document.documentElement.setAttribute("theme", "light");
      }
    };

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", callback);
    }
    return () => {
      if (typeof media.removeEventListener === "function") {
        media.removeEventListener("change", callback);
      }
    };
  }, []);

  return theme;
};
