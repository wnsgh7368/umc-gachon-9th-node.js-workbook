import { StatusCodes } from "http-status-codes";
import { challengeMission } from "../services/userMission.service.js";

export const handleChallengeMission = async (req, res, next) => {
    console.log("미션 도전을 요청하였습니다.");
    console.log("userId:", req.params.userId);
    console.log("missionId:", req.params.missionId);

    const userMission = await challengeMission(req.params.userId, req.params.missionId);
    res.status(StatusCodes.OK).json({ result: userMission });
};

