import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from './themes/themes';

const ThemeContext = createContext('dark');

export const ThemeProvider = ({ children }: { children: any }) => {
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
