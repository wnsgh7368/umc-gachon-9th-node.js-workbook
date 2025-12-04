import { getMyReview, getProgressingMyMission } from "../repositories/me.repository.js";
import { responseFromMyReview, responseFromMissionsOfMe } from "../dtos/me.dto.js";
import { UserNotFoundError } from "../errors.js";

export const readMyReview = async (userId) => {
    if (!userId || isNaN(userId)) {
        throw new UserNotFoundError("유효하지 않은 userId입니다.", { userId });
    }
    const myReview = await getMyReview(userId);
    return responseFromMyReview(myReview);
}

export const listProgressingMyMissions = async (userId, cursor) => {
    if (!userId || isNaN(userId)) {
        throw new UserNotFoundError("유효하지 않은 userId입니다.", { userId });
    }
    
    const myMissions = await getProgressingMyMission(userId, cursor);
    return responseFromMissionsOfMe(myMissions);
}