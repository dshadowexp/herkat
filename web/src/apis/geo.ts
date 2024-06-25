const GEO_URL = 'http://localhost:3005/api/v0/geo';

export async function getCurrentAddress(token: string) {
    const response = await fetch(`${GEO_URL}/address/current`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('invalid request');
    } 
    
    const data = (await response.json()).data;
    console.log(data);
    const { location } = data;
    return location;
}

export async function addCurrentAddress(token: string, geoData: object) {
    const response = await fetch(`${GEO_URL}/address/current`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(geoData),
    });

    if (!response.ok) {
        throw new Error('Address addition failed');
    }

    return;
}

export async function getAddressSuggestions(token: string, prefix: string, country?: string) {
    const response = await fetch(`${GEO_URL}/address/suggestions?prefix=${prefix}&country=${country}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('invalid request');
    } 
    
    const data = (await response.json()).data;
    const { suggestions } = data;
    return suggestions;
}

// export async function getAddressFromLatLng(token: string, lat: number, lng: number) {

// }