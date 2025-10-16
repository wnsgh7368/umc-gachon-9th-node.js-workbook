import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { reviewSubmit} from "../services/review.service.js";

export const handleUserReview = async(req, res, next) => {
    console.log("리뷰 등록을 요청하였습니다.");
    console.log("body: ", req.body);

    const review = await reviewSubmit(bodyToReview(req.body));
    res.status(StatusCodes.OK).json({ result: review });
};
