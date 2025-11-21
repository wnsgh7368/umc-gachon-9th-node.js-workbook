import { pool } from "../db.config.js";

export const addReview = async (data) => {
    try {
        const check = await prisma.review.findFirst( {
            where: {
                userId: data.userId,
                userMissionId: data.userMissionId
            }
        });

        if(check) {
            return null;
        }

        const review = await prisma.review.create({
            data: {
                userId: data.userId,
                storeId: data.storeId,
                userMissionId: data.userMissionId,
                content: data.content,
                score: data.score,
            }
        });

        return review;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
};

export const getReview = async(reviewId) => {
    const review = await prisma.review.findFirstOrThrow(
        {where: {id: reviewId}}
    );
};


