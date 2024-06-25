import { Availability } from "../core/domains";

const AVAILABILITY_URL = 'http://localhost:3001/api/v0/availability';

export async function getAvailabilities(token: string, signal?: AbortSignal) {
    const response = await fetch(`${AVAILABILITY_URL}`, {
        signal,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Getting availabilities error');
    } 

    const jsonData = (await response.json()).data;
    const { availabilities } = jsonData;
    return availabilities
}

export async function getAvailability(token: string, day: string, signal?: AbortSignal) {
    const response = await fetch(`${AVAILABILITY_URL}/${day}`, {
        signal,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Getting availabilities error');
    } 

    const jsonData = (await response.json()).data;
    const { availability } = jsonData;
    return availability
}

export async function createAvailability(token: string, data: Availability) {
    const response = await fetch(`${AVAILABILITY_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Error adding new availability');
    }

    const jsonData = (await response.json()).data;
    const { availability } = jsonData;
    return availability
}

export async function updateAvailability(token: string, data: Availability) {
    const response = await fetch(`${AVAILABILITY_URL}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Error adding new availability');
    }

    const jsonData = (await response.json()).data;
    const { availability } = jsonData;
    return availability
}

export async function deleteAvailability(token: string, day: string) {
    const response = await fetch(`${AVAILABILITY_URL}/${day}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Error removing availability');
    }
}

