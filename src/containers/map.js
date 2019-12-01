import React, { Component } from 'react';
import DeckGL, { ScatterplotLayer, ColumnLayer, HeatmapLayer } from 'deck.gl';
import { StaticMap } from 'react-map-gl';

import { Marker } from '../components/marker';
import { Tooltip } from '../components/tooltip';
import { getLocation } from '../services/userLocationService';
import { ThemeContext, Themes } from '../components/theme';

const INITIAL_VIEW_STATE = {
    longitude: 77.41,
    latitude: 23.25,
    zoom: 4
};

export class Map extends Component {
    state = {
        hoveredData: undefined,
        pointerX: undefined,
        pointerY: undefined,
        userLocation: undefined
    };

    static contextType = ThemeContext;

    componentDidMount() {
        //Set User Location
        getLocation((error, position) => {
            if (error) {
                console.log(error);
            } else {
                const { longitude, latitude } = position.coords;
                this.setState({ userLocation: { longitude, latitude } });
            }
        });
    }

    getPollutionWeight(data) {
        const value = data["PM2.5"] ? data["PM2.5"].avg : 0;
        const weight = value / 500;

        if (weight <= 0.2) return 0;
        if (weight > 1) return 1;
        return weight;
    }

    getFillColor(data) {
        const value = data["PM2.5"] ? data["PM2.5"].avg : 0;

        if (value >= 301) return [189, 0, 38, 100];
        if (value >= 201) return [200, 0, 40, 100];
        if (value >= 151) return [253, 141, 60, 100];
        if (value >= 101) return [200, 140, 0, 100];
        return [0, 140, 0, 100];
    }

    getLayers(data) {
        return [
            new ScatterplotLayer({
                id: 'my-scatterplot',
                data,
                filled: true,
                opacity: 0.8,
                radiusMinPixels: 2,
                radiusMaxPixels: 5,
                getPosition: d => [d.longitude, d.latitude],
                getFillColor: this.getFillColor,
            }),
            new ColumnLayer({
                id: 'column-layer',
                data,
                diskResolution: 6,
                radius: 1500,
                extruded: true,
                elevationScale: 30000,
                getPosition: d => [d.longitude, d.latitude],
                getFillColor: this.getFillColor,
                getElevation: this.getPollutionWeight,
                pickable: true,
                onHover: ({ object, x, y }) => this.setState({
                    hoveredData: object,
                    pointerX: x,
                    pointerY: y
                })
            }),
            new HeatmapLayer({
                id: 'heat',
                data,
                getPosition: d => [d.longitude, d.latitude],
                getWeight: this.getPollutionWeight,
                radiusPixels: 60,
            })
        ];
    }

    render() {
        const { REACT_APP_MAPBOX_TOKEN } = process.env;
        const { data } = this.props;
        const { userLocation, hoveredData, pointerX, pointerY } = this.state;

        const mapStyle = this.context.theme === Themes.light ? 'light' : 'dark';

        return (
            <DeckGL
                layers={this.getLayers(data)}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
            >
                <StaticMap
                    mapStyle={`mapbox://styles/mapbox/${mapStyle}-v9`}
                    mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
                >
                    {userLocation && <Marker {...userLocation} />}
                </StaticMap>
                {hoveredData && <Tooltip data={hoveredData} left={pointerX} top={pointerY} />}
            </DeckGL>
        );
    }
}
