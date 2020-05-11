import { useEffect, useState } from 'react';

export function useUserLocation() {
    const [userLocation, setUserLocation] = useState();

    useEffect(() => {
        const { navigator } = window;
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => 
                setUserLocation({ longitude, latitude })
            );
        } else {
            console.log("Unable to get user's Geolocation.");
        }
    }, []);

    return userLocation;
}
