export function getLocation(callback) {
    const { navigator } = window;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => callback(undefined, position));
    } else {
        callback("Geolocation is not supported.");
    }
}
