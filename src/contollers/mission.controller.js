import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { missionAdd } from "../services/mission.service.js";
import { asyncHandler } from "../utils/error.js";
import { InvalidStoreIdError } from "../errors.js";

/**
 * @swagger
 * /api/v1/stores/{storeId}/missions:
 *   post:
 *     tags: [Missions]
 *     summary: 미션 등록
 *     description: 특정 가게에 새로운 미션을 등록합니다.
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 가게 ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - reward
 *             properties:
 *               content:
 *                 type: string
 *                 example: 10000원 이상 구매 시 미션 완료
 *               reward:
 *                 type: integer
 *                 example: 1000
 *     responses:
 *       201:
 *         description: 미션 등록 성공
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
 *                     content:
 *                       type: string
 *                       example: 10000원 이상 구매 시 미션 완료
 *                     reward:
 *                       type: integer
 *                       example: 1000
 *       400:
 *         description: 미션 등록 실패
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
 *                     reason:
 *                       type: string
 */
export const handleAddMission = asyncHandler(async (req, res, next) => {
    console.log("미션 등록을 요청하였습니다.");
    console.log("storeId:", req.params.storeId);
    console.log("body:", req.body);

    const storeId = parseInt(req.params.storeId);
    if (isNaN(storeId)) {
        throw new InvalidStoreIdError("유효하지 않은 storeId입니다.", { storeId: req.params.storeId });
    }

    const mission = await missionAdd(storeId, bodyToMission(req.body));
    res.status(StatusCodes.CREATED).json({ result: mission });
});

