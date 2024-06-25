import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const retrievePrismaClient = () => {
    return prisma;
}

export const disconnectDb = async () => {
    await prisma.$disconnect();
}