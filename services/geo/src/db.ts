import { connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

export default async function startMongo() {
    try {
        await connect(MONGODB_URI);
        console.log('MongoDB database successfully connected');
    } catch (error) {
        console.log(`Error connecting to Mongodb:`, error);
    }  
}