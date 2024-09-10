/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const DarkModeSwitchComponent = () => {
  const [isDarkMode, setDarkMode] = React.useState(false);

  // 1
const setDark = () => {

    // 2
    localStorage.setItem("theme", "dark");
  
    // 3
    document.documentElement.setAttribute("data-theme", "dark");
  };
  

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    setDark();
  };

  return (
    <DarkModeSwitch
      style={{ marginBottom: '2rem' }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={120}
    />
  );
};

export default DarkModeSwitchComponent;