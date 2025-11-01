import React from "react";
import LightButton from "../../assets/website/light-mode-button.png";
import DarkButton from "../../assets/website/dark-mode-button.png";

const DarkMode = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  const element = document.documentElement;

  React.useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="relative">
      {/* Light button */}
      <img
        src={LightButton}
        alt="Light mode"
        onClick={toggleTheme}
        className={`w-12 cursor-pointer drop-shadow transition-all duration-300 absolute right-0 z-10 ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Dark button */}
      <img
        src={DarkButton}
        alt="Dark mode"
        onClick={toggleTheme}
        className={`w-12 cursor-pointer drop-shadow transition-all duration-300 ${
          theme === "light" ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default DarkMode;
