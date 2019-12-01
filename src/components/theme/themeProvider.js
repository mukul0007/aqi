import React, { useState, useEffect } from 'react';

import ThemeContext from './context';
import Themes from './themes';

export default ({ children }) => {
    const userTheme = () => Number(window.localStorage.getItem('theme')) || Themes.dark;
    const [ theme, setTheme ] = useState(userTheme);

    const toggleTheme = () => {
        setTheme(theme === Themes.dark ? Themes.light : Themes.dark);
    };

    useEffect(() => window.localStorage.setItem('theme', theme), [theme]);

    return (
        <ThemeContext.Provider  value={ { theme, toggleTheme } }>
            {children}
        </ThemeContext.Provider>
    );
}
