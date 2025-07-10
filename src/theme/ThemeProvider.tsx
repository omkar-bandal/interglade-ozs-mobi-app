import React, {createContext, useCallback, useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {darkTheme, Theme} from './constants';

type ThemeType = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: Theme;
  themeType: ThemeType;
  isDark: boolean;
  setThemeType: (type: ThemeType) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: darkTheme,
  themeType: 'light',
  isDark: false,
  setThemeType: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>('light');
  const [theme, setTheme] = useState<any>(
    systemColorScheme === 'dark' ? darkTheme : darkTheme,
  );

  // Update theme when themeType or system theme changes
  useEffect(() => {
    // let newTheme: Theme;
    const newTheme = themeType === 'dark' ? darkTheme : darkTheme;

    // if (themeType === 'system') {
    //   newTheme = systemColorScheme === 'dark' ? darkTheme : darkTheme;
    // } else {
    //   newTheme = themeType === 'dark' ? darkTheme : darkTheme;
    // }

    setTheme(newTheme);
  }, [themeType, systemColorScheme]);

  const isDark = theme === darkTheme;

  const toggleTheme = useCallback(() => {
    setThemeType(prev => {
      if (prev === 'light') {
        return 'dark';
      }
      if (prev === 'dark') {
        return 'system';
      }
      return 'light';
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        isDark,
        setThemeType,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
