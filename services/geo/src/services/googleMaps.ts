import axios from "axios";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "";
const GOOGLE_MAPS_URL = process.env.GOOGLE_MAPS_URL || "";

class GoogleMapsService {
    private static _instance: GoogleMapsService;

    private constructor() {}

    public static getInstance() {
        if (!GoogleMapsService._instance) {
            GoogleMapsService._instance = new GoogleMapsService();
        }

        return GoogleMapsService._instance; 
    }

    public async getAddressLatLng(address: string): Promise<{ lat: number; lng: number } | null> {
        try {
            const encodedAddress = address.split(' ').join('%20');

            const response = await axios.get(`${GOOGLE_MAPS_URL}/geocode/json`, {
                params: {
                    address: encodedAddress,
                    key: GOOGLE_MAPS_API_KEY, // Replace with your Google Maps API key
                },
            });
            
            const { results } = response.data;
            if (results.length > 0) {
                const location = results[0].geometry.location;
                return { lat: location.lat, lng: location.lng };
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            throw new Error(`Error retrieving address: ${error}`);
        }
    }

    public async getLatLngAddress(lat: number, lng: number): Promise<string | null> {
        try {
            const response = await axios.get(`${GOOGLE_MAPS_URL}/geocode/json`, {
                params: {
                    latlng: `${lat},${lng}`,
                    key: GOOGLE_MAPS_API_KEY,
                },
            });
    
            if (response.data.status === 'OK' && response.data.results.length > 0) {
                const formattedAddress = response.data.results[0].formatted_address;
                return formattedAddress;
            } else {
                return null
            }
        } catch (error) {
            console.error('Error retrieving address:', error);
            throw error;
        }
    }

    public async getAddressSuggestions(prefix: string, country?: string): Promise<string[]> {
        try {
            const encodedAddress = prefix.split(' ').join('%20');
    
            const response = await axios.get(`${GOOGLE_MAPS_URL}/place/autocomplete/json`, {
                params: {
                    input: encodedAddress,
                    key: GOOGLE_MAPS_API_KEY, 
                    components: `country:${country?.toUpperCase()}`,
                    types: 'address|establishment'
                },
            });
            const predictions = response.data.predictions;
            
            // Extract suggestion descriptions from the response
            const suggestions = predictions.map((prediction: any) => prediction.description);
            return suggestions;
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
            throw error;
        }
    }

    public async getDistanceMatrix() {

    }
}

export default GoogleMapsService;