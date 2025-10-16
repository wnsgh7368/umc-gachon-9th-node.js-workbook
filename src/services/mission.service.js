import { checkStoreExists, addMission, getMission } from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";

export const missionAdd = async (storeId, data) => {
    // 가게 존재 여부 확인
    const storeExists = await checkStoreExists(storeId);
    if (!storeExists) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    // 미션 추가
    const missionId = await addMission({
        storeId: storeId,
        content: data.content,
        point: data.point
    });

    // 생성된 미션 조회
    const mission = await getMission(missionId);

    return responseFromMission(mission);
};

