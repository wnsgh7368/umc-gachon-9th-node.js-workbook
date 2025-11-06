import { prisma } from "../db.config.js";

export const getAllStoreReviews = async (storeId, cursor) => {
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            userId: true,
            storeId: true,
            score: true,
            content: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                }
            },
        },
        where: { 
            storeId: storeId,
            id: { gt: cursor }
        },
        orderBy: { id: "asc" },
        take: 5,
    });

    return reviews;
}

export const getAllStoreMissions = async (storeId, cursor) => {
    const missions = await prisma.mission.findMany({
        select: {
            id: true,
            content: true,
            reward: true,
        },
        where: {
            storeId: storeId,
            id: { gt: cursor }
        },
        orderBy: { id: "asc" },
        take: 5,
    });
    
    return missions;
}