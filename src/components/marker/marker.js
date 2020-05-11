import React from 'react';
import { Marker } from 'react-map-gl';

import './marker.scss';
import dot from './dot.png';

export default ({ longitude, latitude }) => (
    <Marker longitude={longitude} latitude={latitude}>
        <img src={dot} className="aqi-user-location-dot" alt="marker"/>
    </Marker>
);
