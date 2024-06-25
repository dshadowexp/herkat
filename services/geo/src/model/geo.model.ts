import { Document, Schema, model } from 'mongoose';
import { GeoCoordinates, Geo } from '../types/geo';

const GeoCoordinatesSchema = new Schema<GeoCoordinates>({
    lat: {
        type: Number,
        required: true,
        min: -90,
        max: 90
    },
    lng: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    }
}, { _id: false });

interface GeoDocument extends Geo, Document {}

const GeoSchema = new Schema<GeoDocument>({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    coordinates: {
        type: GeoCoordinatesSchema,
        required: true
    }
}, { timestamps: true });

const GeoModel = model('Geo', GeoSchema);

export default GeoModel;