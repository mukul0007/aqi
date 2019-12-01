import { get } from './apiService';

export async function getGeocodeData(address) {
    const { REACT_APP_MAPBOX_TOKEN } = process.env;

    let response = await get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`,
        { "access_token": REACT_APP_MAPBOX_TOKEN, "limit": 1 }
    );

    const data = await response.json();
    return (data.features && data.features.length)  ? data.features[0].center : [undefined, undefined];
}
