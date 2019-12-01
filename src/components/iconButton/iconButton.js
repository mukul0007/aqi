import React from 'react';

import './iconButton.scss';

export default ({ icon, onClick }) => (
    <div className="aqi-icon-button" onClick={onClick}>
        <div className="aqi-icon-button__icon">
            {icon}
        </div>
    </div>
);