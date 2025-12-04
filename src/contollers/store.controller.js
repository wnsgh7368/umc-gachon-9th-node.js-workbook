import { StatusCodes } from "http-status-codes";
import { listStoreReview } from "../services/store.service.js";
import { asyncHandler } from "../utils/error.js";
import { InvalidStoreIdError } from "../errors.js";

/**
 * @swagger
 * /api/v1/stores/{storeId}/reviews:
 *   get:
 *     tags: [Stores]
 *     summary: 가게 리뷰 목록 조회
 *     description: 특정 가게의 리뷰 목록을 커서 기반 페이징으로 조회합니다.
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 가게 ID
 *         example: 1
 *       - in: query
 *         name: cursor
 *         required: false
 *         schema:
 *           type: integer
 *         description: 커서 (마지막 리뷰 ID)
 *         example: 0
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
 *                       score:
 *                         type: number
 *                         example: 5
 *                       content:
 *                         type: string
 *                         example: 맛있어요
 *                       createdAt:
 *                         type: string
 *                         example: 2023-10-01
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
export const handleListReviews = asyncHandler(async (req, res, next) => {
    const storeId = parseInt(req.params.storeId);
    if (isNaN(storeId)) {
        throw new InvalidStoreIdError("유효하지 않은 storeId입니다.", { storeId: req.params.storeId });
    }

    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;
    const reviews = await listStoreReview(storeId, cursor);
    res.status(StatusCodes.OK).json({ result: reviews });
});

export const handleListStoreMission = async (req, res, next) => {
    try {
        const missions = await listStoreMission(
            parseInt(req.params.storeId),
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        res.status(StatusCodes.OK).json( { result: missions } );
    } catch(error) {
        next(error);
    }
}