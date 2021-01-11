import { useState } from "react";

export default function UseTheme() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    if (theme === "light") {
      console.log("light");
      setTheme("dark");
    } else {
      setTheme("light");
      console.log("dark");
    }
  };

  return [theme, toggleTheme];
}
