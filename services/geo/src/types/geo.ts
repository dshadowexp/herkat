export type GeoCoordinates = {
    lat: number,
    lng: number
}

export type Geo = {
    uid: string,
    country: string,
    address: string,
    coordinates: GeoCoordinates
}