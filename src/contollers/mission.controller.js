import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { missionAdd } from "../services/mission.service.js";
import { asyncHandler } from "../utils/error.js";
import { InvalidStoreIdError } from "../errors.js";

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

