import { StatusCodes } from "http-status-codes";
import { listProgressingMyMissions, readMyReview } from "../services/me.service.js";
import { asyncHandler } from "../utils/error.js";
import { MissingUserIdError } from "../errors.js";

export const handleMyReviews = asyncHandler(async (req, res, next) => {
    console.log("내가 작성한 리뷰를 조회합니다.");
    
    const userId = parseInt(req.query.userId);
    
    if (!userId || isNaN(userId)) {
        throw new MissingUserIdError("userId는 필수입니다.", { userId: req.query.userId });
    }
    
    const reviews = await readMyReview(userId);
    res.status(StatusCodes.OK).json({ result: reviews });
});

export const handleMyMissions = asyncHandler(async (req, res, next) => {
    console.log("진행중인 미션을 확인합니다.");
    
    const userId = parseInt(req.query.userId);

    if (!userId || isNaN(userId)) {
        throw new MissingUserIdError("userId는 필수입니다.", { userId: req.query.userId });
    }
    
    const myMissions = await listProgressingMyMissions(userId);
    res.status(StatusCodes.OK).json({ result: myMissions });
});