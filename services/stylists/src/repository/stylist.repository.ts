import { retrievePrismaClient } from ".";

export const findStylistById = async (id: string) => {
    try {
        const stylist = await retrievePrismaClient().stylist.findUnique({
            where: {
                id
            }
        });

        return stylist;
    } catch (error) {
        return null;
    }
}

export const findStylistByUid = async (uid: string) => {
    try {
        const stylist = await retrievePrismaClient().stylist.findUnique({
            where: {
                uid
            }
        });

        return stylist;
    } catch (error) {
        return null;
    }
}

export const createNewStylist = async (uid: string) => {
    const prisma = retrievePrismaClient();

    try {
        const stylist = await prisma.stylist.create({
            data: { uid }
        });
        console.log('stylist created###########');
        console.log(stylist);

        return stylist
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
}