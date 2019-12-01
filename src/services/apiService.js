export const get = (url, params) => {
    params = new URLSearchParams(params).toString();
    return fetch(url+'?'+params);
}
