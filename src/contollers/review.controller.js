import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { reviewSubmit } from "../services/review.service.js";
import { asyncHandler } from "../utils/error.js";

/**
 * @swagger
 * /api/v1/reviews:
 *   post:
 *     tags: [Reviews]
 *     summary: 리뷰 작성
 *     description: 가게에 대한 리뷰를 작성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - storeId
 *               - score
 *               - content
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               storeId:
 *                 type: integer
 *                 example: 1
 *               score:
 *                 type: number
 *                 example: 4.5
 *               content:
 *                 type: string
 *                 example: 정말 맛있어요!
 *     responses:
 *       200:
 *         description: 리뷰 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     storeId:
 *                       type: integer
 *                       example: 1
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     score:
 *                       type: number
 *                       example: 4.5
 *                     content:
 *                       type: string
 *                       example: 정말 맛있어요!
 *       400:
 *         description: 리뷰 작성 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: FAIL
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: R001
 *                     reason:
 *                       type: string
 *                       example: 존재하지 않는 가게입니다.
 */
export const handleUserReview = asyncHandler(async (req, res, next) => {
    console.log("리뷰 등록을 요청하였습니다.");
    console.log("body: ", req.body);

    const review = await reviewSubmit(bodyToReview(req.body));
    res.status(StatusCodes.OK).json({ result: review });
});
