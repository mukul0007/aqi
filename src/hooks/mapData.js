import { useEffect, useState } from 'react';

import { getAqiData } from '../services/aqiService';
import { getGeocodeData } from '../services/geocodeSevice';

export function useMapData() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState({ data: [], updatedAt: null });

    useEffect(() => {
        fetchAqiData()
    }, []);
    
    const fetchAqiData = async () => {
        setLoading(true);
        try {
            //Get Aqi data from gov api
            const aqiResponseData = await Promise.all([getAqiData(), getAqiData(1)]);
            const aqiData = [...aqiResponseData[0], ...aqiResponseData[1]];

            //Get geocodes and fill them in stations
            const result = await fetchAndFillCoordinateData(aqiData);

            setData({data: result, updatedAt: result[0].updatedAt});
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return [loading, data, error];
}

function fetchAndFillCoordinateData(aqiData) {
    const promises = aqiData.map(async ({address, ...others}) => { 
        try {
            const [longitude, latitude] = await getGeocodeData(address);
            return { address, longitude, latitude, ...others };
        } catch(e) {
            console.log('Error getting Lat Long ->', e);
        }
    });
    
    return Promise.all(promises);
  }
  