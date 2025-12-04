import { prisma } from "../db.config.js";

export const getMyReview = async (userId) => {
    const myReview = await prisma.review.findMany({
        select: {
            id: true,
            userId: true,
            storeId: true,
            userMissionId: true,
            score: true,
            content: true,
            store: {
                select: {
                    id: true,
                    name: true,
                }
            },
            userMission: {
                select: {
                    id: true,
                }
            }
        },
        where: {
            userId: userId
        },
        orderBy: {
            id: "desc"
        },
        take: 20
    });
    
    return myReview;
}

export const getProgressingMyMission = (userId, cursor) => {
    const myMissions = prisma.userMission.findMany({
        select: {
            id: true,
            userId: true,
            mission: {
                select: {
                    id: true,
                    content: true,
                    reward: true,
                    store: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            },
        },
        where: {
            is_completed: false,
            userId: userId,
        },
        orderBy: {id: "asc"},
        take: 20
    });

    return myMissions;
}