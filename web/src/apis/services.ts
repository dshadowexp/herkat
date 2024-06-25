const SERVICES_URL = 'http://localhost:3006/api/v0/services';

export async function getServicesSummary(stylistId: string, token: string, signal?: AbortSignal) {
    const response = await fetch(`${SERVICES_URL}/summary/${stylistId}`, {
        signal,
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
    const { services } = data;
    return services;
}