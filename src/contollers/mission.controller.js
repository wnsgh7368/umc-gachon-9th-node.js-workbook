import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { missionAdd } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
    console.log("미션 등록을 요청하였습니다.");
    console.log("storeId:", req.params.storeId);
    console.log("body:", req.body);

    const mission = await missionAdd(req.params.storeId, bodyToMission(req.body));
    res.status(StatusCodes.OK).json({ result: mission });
};

export const handleChallengeMission = async (req, res, next) => {
    console.log("미션 도전을 요청하였습니다.");
    console.log("userId:", req.params.userId);
    console.log("missionId:", req.params.missionId);

    const userMission = await challengeMission(req.params.userId, req.params.missionId);
    res.status(StatusCodes.OK).json({ result: userMission });
};

