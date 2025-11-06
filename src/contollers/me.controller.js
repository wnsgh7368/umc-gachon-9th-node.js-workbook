import { StatusCodes } from "http-status-codes";
import { listProgressingMyMissions, readMyReview } from "../services/me.service.js";

export const handleMyReviews = async (req, res, next) => {
    try {
        console.log("내가 작성한 리뷰를 조회합니다.");
        
        const userId = parseInt(req.query.userId);
        
        if (!userId || isNaN(userId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "userId는 필수입니다."
            });
        }
        
        const reviews = await readMyReview(userId);
        res.status(StatusCodes.OK).json({ result: reviews });
    } catch (error) {
        next(error);
    }
}

export const handleMyMissions = async (req, res, next) => {
    try {
        console.log("진행중인 미션을 확인합니다.");
        const userId = parseInt(req.query.userId);

        if(!userId || isNaN(userId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "userId는 필수입니다."
            });
        }
        const myMissions = await listProgressingMyMissions(userId);
        res.status(StatusCodes.OK).json({ result: myMissions});
    } catch (error) {
        next(error);
    }
}