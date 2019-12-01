import React, { useContext } from 'react';

import { ThemeContext, Themes } from '../theme';

import loaderDark from './loader_dark.gif';
import loaderLight from './loader_light.gif';
import './loader.scss';

export default props => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <div className="aqi-loader">
            <img src={theme === Themes.light ? loaderLight : loaderDark} alt="Loader" />
            <div>Fetching AQI Data</div>
        </div>
    )
};
