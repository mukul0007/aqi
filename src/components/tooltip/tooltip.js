import React from 'react';
import './tooltip.scss';

export default ({data, left, top}) => {
    const parametersAvailable = ['PM2.5', 'PM10', 'OZONE', 'CO', 'NO2', 'NH3', 'SO2'];
    const renderParameters = parametersAvailable.map( parameter => data[parameter] ? (
        <div className="parameter" key={parameter}>
            {parameter} :  {data[parameter].avg}
        </div>
      ): null
    );
    
    return (
        <div className="aqi-tooltip" style={{ left, top }}>
            <div className="aqi-tooltip__header">
                { data.station }
            </div>
            <div className="aqi-tooltip__body">
                { renderParameters }
            </div>
        </div>
    );
};
