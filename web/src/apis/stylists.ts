const STYLIST_URL = 'http://localhost:3003/api/v0/stylists';

export async function getStylist(token: string, signal?: AbortSignal) {
    const response = await fetch(`${STYLIST_URL}`, {
        signal,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (response.ok) {
        const jsonData = (await response.json()).data;
        const { stylist: sty } = jsonData;
        return sty;
    } 
}

export async function createStylist(token: string, data: string) {
    const response = await fetch(`${STYLIST_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data
    });

    if (!response.ok) {
        throw new Error('Setup failed');
    }

    const jsonData = (await response.json());
    const { stylist: sty } = jsonData.data;
    return sty;
}