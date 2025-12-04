import { addReview, getReview } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";
import { DuplicateReviewError } from "../errors.js";

export const reviewSubmit = async (data) => {
    const reviewId = await addReview({
        userId: data.userId, 
        missionId: data.missionId, 
        userMissionId: data.userMissionId, 
        rvContent: data.rvContent, 
        score: data.score
    });
    if(reviewId === null) {
        throw new DuplicateReviewError("이미 작성한 리뷰입니다.", data);
    }
    const review = await getReview(reviewId);

    return responseFromReview(review);
}