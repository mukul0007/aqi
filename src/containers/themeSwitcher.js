import React, { useContext } from 'react';

import { IconButton } from '../components/iconButton';

import { ThemeContext, Themes } from '../components/theme';
import { Sun, Moon } from '../components/icons';

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    
    return (
        <IconButton 
            icon={theme === Themes.light ? <Sun /> : <Moon />}
            onClick={ toggleTheme }
        />
    );
};
