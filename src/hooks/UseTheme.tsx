import { useEffect, useState } from "react";

export default function UseTheme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const localStorageTheme = window.localStorage.getItem("theme");
    setTheme(localStorageTheme || "light");
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      console.log("dark");
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      console.log("light");
      window.localStorage.setItem("theme", "light");
    }
  };

  return [theme, toggleTheme];
}
