import { Availability, Day } from "@prisma/client";
import { retrievePrismaClient } from ".";

export const findStylistAvailabities = async (uid: string) => {
    try {
        const availabilities = await retrievePrismaClient().availability.findMany({
            where: {
                uid
            },
            select: {
                day: true,
                startTime: true,
                endTime: true,
            }
        });

        return availabilities;
    } catch (error) {
        throw error;
    }
}

export const findAvailability = async (uid: string, day: Day) => {
    try {
        let availability = await retrievePrismaClient().availability.findUnique({
            where: {
                uid_day: {
                    uid, day
                }
            }, 
            select: {
                day: true,
                startTime: true,
                endTime: true,
            }
        });

        return availability;
    } catch (error) {
        throw error;
    }
}

export const createAvailabity = async (availability: Availability) => {
    try {
        const { uid, day, startTime, endTime } = availability;
        const av = await retrievePrismaClient().availability.create({
            data: { uid, day, startTime, endTime }
        });
        return av;
    } catch (error) {
        throw error;
    }
}

export const editAvailability = async (availability: Availability) => {
    try {
        const { uid, day, startTime, endTime } = availability;
        const av = await retrievePrismaClient().availability.update({
            where: {
                uid_day: {
                    uid, day
                }
            }, data: {
                startTime, endTime
            },
            select: {
                day: true,
                startTime: true,
                endTime: true,
            }
        });

        return av;
    } catch (error) {
        throw error;
    }
}

export const deleteAvailability = async (uid: string, day: Day) => {
    try {
        await retrievePrismaClient().availability.delete({
            where: {
                uid_day: {
                    uid, day
                }
            }
        });
    } catch (error) {
        throw error;
    }
}