import React, { useState, useContext } from 'react';
import DeckGL, { ScatterplotLayer, ColumnLayer, HeatmapLayer } from 'deck.gl';
import { StaticMap } from 'react-map-gl';

import { Marker } from '../components/marker';
import { Tooltip } from '../components/tooltip';
import { ThemeContext, Themes } from '../components/theme';

import { useUserLocation } from '../hooks/userLocation';

const INITIAL_VIEW_STATE = {
    longitude: 77.41,
    latitude: 23.25,
    zoom: 4
};

export const Map = React.memo(({ data }) => {
    const [hoverData, setHoverData] = useState();
    const { theme } = useContext(ThemeContext);
    const userLocation = useUserLocation();
    
    const layers = getLayers(data, ({ object: data, x: left, y: top }) => 
        setHoverData(data ? {data, left, top} : null)
    );   
    const mapStyle = theme === Themes.light ? 'light' : 'dark';
    const { REACT_APP_MAPBOX_TOKEN } = process.env;

    return (
        <DeckGL layers={layers} initialViewState={INITIAL_VIEW_STATE} controller={true}>
            <StaticMap
                mapStyle={`mapbox://styles/mapbox/${mapStyle}-v9`}
                mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
            >
                {userLocation && <Marker {...userLocation} />}
            </StaticMap>
            {hoverData && <Tooltip {...hoverData} />}
        </DeckGL>
    ); 
});

function getLayers(data, onHover) {
    const commonProps = { data, getPosition: d => [d.longitude, d.latitude], getFillColor };

    return [
        new ScatterplotLayer({
            ...commonProps,
            id: 'my-scatterplot',
            filled: true,
            opacity: 0.8,
            radiusMinPixels: 2,
            radiusMaxPixels: 5,
        }),
        new ColumnLayer({
            ...commonProps,
            id: 'column-layer',
            diskResolution: 6,
            radius: 1500,
            extruded: true,
            elevationScale: 30000,
            getElevation: getPollutionWeight,
            pickable: true,
            onHover: onHover
        }),
        new HeatmapLayer({
            ...commonProps,
            id: 'heat',
            getWeight: getPollutionWeight,
            radiusPixels: 60,
        })
    ];
}

function getPollutionWeight(data) {
    const value = data["PM2.5"] ? data["PM2.5"].avg : 0;
    const weight = value / 500;

    if (weight <= 0.2) return 0;
    if (weight > 1) return 1;
    return weight;
}

function getFillColor(data) {
    const value = data["PM2.5"] ? data["PM2.5"].avg : 0;

    if (value >= 301) return [189, 0, 38, 100];
    if (value >= 201) return [200, 0, 40, 100];
    if (value >= 151) return [253, 141, 60, 100];
    if (value >= 101) return [200, 140, 0, 100];
    return [0, 140, 0, 100];
}
