import React, { createContext, useState, useContext, useEffect } from 'react';
import { Colors } from '../constants/Colors';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  tabBarBackground: Colors.light.background_02,
});

import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState('light');
  const [tabBarBackground, setTabBarBackground] = useState(Colors.light.background_02);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      setTabBarBackground(newTheme === 'light' ? Colors.light.background_02 : Colors.dark.background_02);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, tabBarBackground }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
