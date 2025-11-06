import { pool } from "../db.config.js";

// 가게 존재 여부 확인
export const checkStoreExists = async (storeId) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await pool.query(
            'SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;',
            storeId
        );
        return result[0].isExistStore;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 미션 추가
export const addMission = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await pool.query(
            'INSERT INTO mission_list (store_id, content, point) VALUES (?, ?, ?);',
            [
                data.storeId,
                data.content,
                data.point
            ]
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

// 미션 조회
export const getMission = async (missionId) => {
    const conn = await pool.getConnection();
    try {
        const [mission] = await pool.query(
            'SELECT * FROM mission_list WHERE id = ?;',
            missionId
        );
        console.log(mission);
        if (mission.length == 0) {
            return null;
        }
        return mission;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};
