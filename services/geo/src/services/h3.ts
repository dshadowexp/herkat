import { gridDiskDistances, latLngToCell } from "h3-js";

class H3Service {
    private static _instance: H3Service;

    private constructor() {}

    public static getInstance() {
        if (!H3Service._instance) {
            H3Service._instance = new H3Service();
        }

        return H3Service._instance; 
    }

    public getGeoIndexFromLatLng(latitude: number, longitude: number, resolution: number) {
        try {
            // Convert the latitude and longitude to an H3 index
            const geoIndex = latLngToCell(latitude, longitude, resolution);
            // 
            return geoIndex;
        } catch (error) {
            console.error(error);
            return '';
        }
    }

    public findConnectedCells(centerIndex: string, degree = 3) {
        try {
            // Find the connected cells in varying degrees
            const connectedCells = gridDiskDistances(centerIndex, degree);
            // Sort the levels according to length of elements
            connectedCells.sort((a, b) => a.length - b.length);
            // Return the levels connected cells
            return connectedCells;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

export default H3Service;