import { Service } from "@prisma/client";
import { retrievePrismaClient } from ".";

export const findServicesBySid = async (sid: string) => {
    try {
        const availabilities = await retrievePrismaClient().service.findMany({
            where: {
                sid
            }
        });

        return availabilities;
    } catch (error) {
        throw error;
    }
}

export const findServiceById = async (id: string) => {
    try {
        let availability = await retrievePrismaClient().service.findUnique({
            where: {
                id
            }
        });

        return availability;
    } catch (error) {
        throw error;
    }
}

export const addService = async (service: Service) => {
    try {
        const serv = await retrievePrismaClient().service.create({
            data: service
        });
        
        return serv;
    } catch (error) {
        throw error;
    }
}

export const editService = () => {
    try {
        
    } catch (error) {
        throw error;
    }
}

export const removeService = (id: string) => {
    try {
        
    } catch (error) {
        throw error;
    }
}