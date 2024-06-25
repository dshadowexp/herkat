import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAccountModel = () => {
    return prisma.account;
}

export const getTransactionModel = () => {
    return prisma.transaction;
}

export const retrievePrismaClient = () => {
    return prisma;
}

export const disconnectDb = async () => {
    await prisma.$disconnect();
}