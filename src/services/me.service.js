import { getMyReview } from "../repositories/me.repository.js";
import { responseFromMyReview } from "../dtos/response/myReviewResponse.dto.js";

export const readMyReview = async (userId) => {
    const myReview = await getMyReview(userId);
    return responseFromMyReview(myReview);
}