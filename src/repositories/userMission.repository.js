import { pool } from "../db.config.js";

// 사용자가 이미 미션에 도전 중인지 확인
export const checkUserMissionExists = async (userId, missionId) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await pool.query(
            'SELECT EXISTS(SELECT 1 FROM user_mission WHERE user_id = ? AND mission_id = ? AND status = "IN_PROGRESS") as isChallengingMission;',
            [userId, missionId]
        );
        return result[0].isChallengingMission;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 미션 존재 여부 확인
export const checkMissionExists = async (missionId) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await pool.query(
            'SELECT EXISTS(SELECT 1 FROM mission_list WHERE id = ?) as isExistMission;',
            missionId
        );
        return result[0].isExistMission;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 사용자 존재 여부 확인
export const checkUserExists = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await pool.query(
            'SELECT EXISTS(SELECT 1 FROM user WHERE id = ?) as isExistUser;',
            userId
        );
        return result[0].isExistUser;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 미션 도전 추가
export const addUserMission = async (userId, missionId) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await pool.query(
            'INSERT INTO user_mission (user_id, mission_id, status) VALUES (?, ?, "IN_PROGRESS");',
            [userId, missionId]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 사용자 미션 조회
export const getUserMission = async (userMissionId) => {
    const conn = await pool.getConnection();
    try {
        const [userMission] = await pool.query(
            'SELECT * FROM user_mission WHERE id = ?;',
            userMissionId
        );
        console.log(userMission);
        if (userMission.length == 0) {
            return null;
        }
        return userMission;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

