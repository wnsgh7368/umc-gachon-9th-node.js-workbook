import { 
    checkUserExists, 
    checkMissionExists, 
    checkUserMissionExists, 
    addUserMission, 
    getUserMission 
} from "../repositories/userMission.repository.js";
import { responseFromUserMission } from "../dtos/userMission.dto.js";
import { UserNotFoundError, MissionNotFoundError, MissionAlreadyChallengedError } from "../errors.js";

export const challengeMission = async (userId, missionId) => {
    // 사용자 존재 여부 확인
    const userExists = await checkUserExists(userId);
    if (!userExists) {
        throw new UserNotFoundError("존재하지 않는 사용자입니다.", { userId });
    }

    // 미션 존재 여부 확인
    const missionExists = await checkMissionExists(missionId);
    if (!missionExists) {
        throw new MissionNotFoundError("존재하지 않는 미션입니다.", { missionId });
    }

    // 이미 도전 중인 미션인지 확인
    const alreadyChallenging = await checkUserMissionExists(userId, missionId);
    if (alreadyChallenging) {
        throw new MissionAlreadyChallengedError("이미 도전 중인 미션입니다.", { userId, missionId });
    }

    // 미션 도전 추가
    const userMissionId = await addUserMission(userId, missionId);

    // 생성된 사용자 미션 조회
    const userMission = await getUserMission(userMissionId);

    return responseFromUserMission(userMission);
};

