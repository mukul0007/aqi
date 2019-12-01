import React from 'react';

import Themes from './themes';

const ThemeContext = React.createContext({
    theme: Themes.dark,
    toggleTheme: () => {},
});

export const ThemeConsumer = ThemeContext.Consumer;
export default ThemeContext;
