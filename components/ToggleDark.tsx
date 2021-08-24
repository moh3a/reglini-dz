import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";

// WHEN RELOADING IN A DARK THEME
// I HAVE TO CLICK ONCE SETTHEME DARK
// THEN AGAIN TO TOGGLE TO LIGHT
// NEED TO GRAB THE THEM ON LOAD

const ToggleDark = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className="flex items-center justify-center w-full ">
        <label htmlFor="toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id="toggle"
              className="sr-only darkmode-input"
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              checked={theme === "dark" ? true : false}
            />
            <div className="block bg-gray-400 w-14 h-8 rounded-full z-90"></div>
            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition z-90"></div>
            <div className="absolute left-1 top-1 w-6 h-6 rounded-full z-0">
              <MoonIcon
                className="text-white"
                // className='{theme === "light" ? "hidden" : ""}'
              />
            </div>
            <div className="absolute right-1 top-1 w-6 h-6 rounded-full z-0">
              <SunIcon
                className="text-black"
                // className='{theme === "dark" ? "hidden" : ""}'
              />
            </div>
          </div>
          {/* <div className="ml-3 text-gray-700 font-medium dark:text-gray-100">
            Dark mode!
          </div> */}
        </label>
      </div>
    </>
  );
};

export default ToggleDark;
