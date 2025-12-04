import { prisma } from "../db.config.js";
// 가게 존재 여부 확인
export const checkStoreExists = async (storeId) => {
    const store = await prisma.$exist.store(storeId);
    return store;
};

// 미션 추가
export const addMission = async (data) => {
    const mission = await prisma.mission.findFirst( {where: {id: data.id}});
    if(mission) {
        return null;
    }
    const created = await prisma.mission.create( { data: data });

    return created;
};

// 미션 조회
export const getMission = async (missionId) => {
    const mission = await prisma.mission.findFirstOrThrow( {where: {id: missionId}});
    return mission;
};
