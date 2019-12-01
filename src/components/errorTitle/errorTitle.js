import React from 'react';

import error from './error.png';
import './errorTitle.scss';

export default props => (
    <div className="aqi-errorTitle">
        <div className="aqi-errorTitle__img">
            <img src={error} alt="error" />
        </div>
        <div className="aqi-errorTitle__msg">Unable to get live AQI data</div>
    </div>
);
