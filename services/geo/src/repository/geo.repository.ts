import GeoModel from "../model/geo.model";
import { Geo } from "../types/geo";

// Create a new location
export async function createGeo(uid: string, country: string, address: string, lat: number, lng: number) {
    try {
        const geo = new GeoModel({
            uid,
            address,
            country,
            coordinates: {
                lat,
                lng
            }
        });
        const savedLocation = await geo.save();
        return savedLocation;
    } catch (error) {
        console.error('Error creating location:', error);
        throw error;
    }
}

// Get a location by its unique identifier (uid)
export async function getGeoByUid(uid: string) {
    try {
        const location = await GeoModel.findOne({ uid });
        return location;
    } catch (error) {
        console.error('Error getting location by UID:', error);
        throw error;
    }
}

// Update a location by its unique identifier (uid)
export async function updateLocation(uid: string, updates: Partial<Geo>) {
    try {
        const updatedLocation = await GeoModel.findOneAndUpdate({ uid }, updates, { new: true });
        return updatedLocation;
    } catch (error) {
        console.error('Error updating location by UID:', error);
        throw error;
    }
}

// Delete a location by its unique identifier (uid)
export async function deleteLocation(uid: string) {
    try {
        const deletedLocation = await GeoModel.findOneAndDelete({ uid });
        return deletedLocation;
    } catch (error) {
        console.error('Error deleting location by UID:', error);
        throw error;
    }
}
