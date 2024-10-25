import { useState, useEffect } from "react";

function Theme() {
  const initialTheme = localStorage.getItem("currentTheme") || "dark";
  const [theme, setTheme] = useState(initialTheme);
  const handleModeClick = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    document.querySelector("body")?.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    localStorage.setItem("currentTheme", theme);
  }, [theme]);

  useEffect(() => {
    document.querySelector("body")?.setAttribute("data-theme", theme);
  }, []);
  return (
    <div className="container ">
      <div className="row align-items-center justify-content-between">
        <div className="col-12 col-md-11 text-center ">
          <h1 className="text-center m-5">Movie App</h1>
        </div>
        <div className="col-12 col-md-1 text-center p-4 ">
          <button
            className={
              theme === "dark"
                ? "btn btn-light theme-btn"
                : "btn btn-dark theme-btn"
            }
            onClick={handleModeClick}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Theme;
