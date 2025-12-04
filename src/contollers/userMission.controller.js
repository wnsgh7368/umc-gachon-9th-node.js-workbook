import { StatusCodes } from "http-status-codes";
import { challengeMission } from "../services/userMission.service.js";
import { asyncHandler } from "../utils/error.js";
import { InvalidParamsError } from "../errors.js";

export const handleChallengeMission = asyncHandler(async (req, res, next) => {
    console.log("미션 도전을 요청하였습니다.");
    console.log("userId:", req.params.userId);
    console.log("missionId:", req.params.missionId);

    const userId = parseInt(req.params.userId);
    const missionId = parseInt(req.params.missionId);

    if (isNaN(userId) || isNaN(missionId)) {
        throw new InvalidParamsError(
            "userId와 missionId는 유효한 숫자여야 합니다.",
            { userId: req.params.userId, missionId: req.params.missionId }
        );
    }

    const userMission = await challengeMission(userId, missionId);
    res.status(StatusCodes.CREATED).json({ result: userMission });
});

