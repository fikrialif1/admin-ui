import React, { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div
      onClick={toggleDarkMode}
      className={`w-6 h-6 rounded-md cursor-pointer mb-2 flex items-center justify-center ${
        darkMode ? "text-white" : "text-gray-400"
      }`}
    >
      {darkMode ? (
        <LightModeIcon sx={{ fontSize: 16 }} />

      ) : (
        <DarkModeIcon sx={{ fontSize: 16 }} />
      )}
    </div>
  );
};

export default DarkModeToggle;