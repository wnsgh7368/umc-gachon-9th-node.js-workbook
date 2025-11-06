import { getMyReview } from "../repositories/me.repository.js";
import { getProgressingMyMission } from "../repositories/me.repository.js";
import { responseFromMyReview, responseFromMissionsOfMe } from "../dtos/me.dto.js";

export const readMyReview = async (userId) => {
    const myReview = await getMyReview(userId);
    return responseFromMyReview(myReview);
}

export const listProgressingMyMissions = async (userId, cursor) => {
    const myMissions = await getProgressingMyMission(userId, cursor);
    return responseFromMissionsOfMe(myMissions); //TODO: dto로 감싸기
}