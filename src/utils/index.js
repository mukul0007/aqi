export const aggregateStationData = data => {
    const stations = data.reduce((result, value) => {
        const { station, pollutant_id, pollutant_min, pollutant_max, pollutant_avg, last_update } = value;
        const stationName = station.split('-')[0].replace(/(\.|\$|#|\[|\])*/g, "").trim();
        result[stationName] = {
            ...(result[stationName] || { 
                station: stationName, 
                address: formatAddress(value), 
                updatedAt: last_update
            }),
            [pollutant_id]: { min: pollutant_min, max: pollutant_max, avg: pollutant_avg }
        };
        return result;
    }, {});
    return Object.values(stations);
}

function formatAddress(data) {
    const { station, city, state, country } = data;
    const stationAddr = station.split('-')[0];

    return [stationAddr, city, state, country].filter(d => !!d).join(',');
}
