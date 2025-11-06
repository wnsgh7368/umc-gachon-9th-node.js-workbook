import { pool } from "../db.config.js";

// 사용자가 이미 미션에 도전 중인지 확인
export const checkUserMissionExists = async (userId, missionId) => {
    const check = await prisma.userMission.findFirst({where: {userId: userId, missionId: missionId}});
    return check;
};

// 미션 존재 여부 확인
export const checkMissionExists = async (missionId) => {
    const check = await prisma.mission.findFirst({where: {missionId: missionId}});
};

// 사용자 존재 여부 확인
export const checkUserExists = async (userId) => {
    const check = await prisma.mission.findFirst({where: {userId: userId}});
    return check;
};

// 미션 도전 추가
export const addUserMission = async (data) => {
    const userMission = await prisma.userMission.findFirst( { where: {id: data.userMissionId} } );
    if(userMission) {
        return null;
    }
    const created = await prisma.userMission.create( {
        data: data
    });
};

// 사용자 미션 조회
export const getUserMission = async (userMissionId) => {
    const userMission = await prisma.userMission.findFirst( { where: {id: userMissionId} } );
    return userMission;
};

