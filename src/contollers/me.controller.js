import { StatusCodes } from "http-status-codes";
import { listProgressingMyMissions, readMyReview } from "../services/me.service.js";
import { asyncHandler } from "../utils/error.js";
import { MissingUserIdError } from "../errors.js";

/**
 * @swagger
 * /api/v1/me/reviews:
 *   get:
 *     tags: [MyPage]
 *     summary: 내 리뷰 조회
 *     description: 내가 작성한 리뷰 목록을 조회합니다.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 사용자 ID
 *         example: 1
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       storeName:
 *                         type: string
 *                         example: 맛집
 *                       score:
 *                         type: number
 *                         example: 5
 *                       content:
 *                         type: string
 *                         example: 최고!
 *       400:
 *         description: 조회 실패
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
 */
export const handleMyReviews = asyncHandler(async (req, res, next) => {
    console.log("내가 작성한 리뷰를 조회합니다.");
    
    const userId = parseInt(req.query.userId);
    
    if (!userId || isNaN(userId)) {
        throw new MissingUserIdError("userId는 필수입니다.", { userId: req.query.userId });
    }
    
    const reviews = await readMyReview(userId);
    res.status(StatusCodes.OK).json({ result: reviews });
});

/**
 * @swagger
 * /api/v1/me/challenge-missions:
 *   get:
 *     tags: [MyPage]
 *     summary: 진행 중인 미션 조회
 *     description: 내가 진행 중인 미션 목록을 조회합니다.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 사용자 ID
 *         example: 1
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       storeName:
 *                         type: string
 *                         example: 맛집
 *                       missionSpec:
 *                         type: string
 *                         example: 1만원 이상 구매
 *                       reward:
 *                         type: integer
 *                         example: 500
 *                       status:
 *                         type: string
 *                         example: CHALLENGING
 *       400:
 *         description: 조회 실패
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
 */
export const handleMyMissions = asyncHandler(async (req, res, next) => {
    console.log("진행중인 미션을 확인합니다.");
    
    const userId = parseInt(req.query.userId);

    if (!userId || isNaN(userId)) {
        throw new MissingUserIdError("userId는 필수입니다.", { userId: req.query.userId });
    }
    
    const myMissions = await listProgressingMyMissions(userId);
    res.status(StatusCodes.OK).json({ result: myMissions });
});