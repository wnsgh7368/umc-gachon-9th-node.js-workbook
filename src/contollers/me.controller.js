import { StatusCodes } from "http-status-codes";
import { readMyReview } from "../services/me.service.js";

export const handleMyReviews = async (req, res, next) => {
    try {
        console.log("내가 작성한 리뷰를 조회합니다.");
        
        // GET 요청이므로 query parameter 사용
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