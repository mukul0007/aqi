import { aggregateStationData } from '../utils';
import { get } from './apiService';

export async function getAqiData(page = 0) {
    const { REACT_APP_AQI_API_KEY } = process.env;
    const limit = 999;
    const offset = page * limit;

    let response = await get(
        "https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69",
        { "api-key": REACT_APP_AQI_API_KEY, format: "json", limit, offset }
    );
    
    response = await response.json();
    const data = response.records;
    return aggregateStationData(data);
}
