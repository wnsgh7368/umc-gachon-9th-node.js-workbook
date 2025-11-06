import { pool } from "../db.config.js";

export const addReview = async (data) => {
    const conn = await pool.getConnection();

    try{
        const[confirm] = await pool.query(
            //해당 유저가 미션을 수행한게 맞는지
            'SELECT EXISTS(SELECT 1 FROM review WHERE user_id = ? AND mission_id = ?) as isExistReview;',
            [data.userId, data.missionId]
        );
        if (confirm[0].isExistReview) {
            return null;
        }

        const[result] = await pool.query(
            'INSERT INTO review (user_id, mission_id, user_mission_id, rv_content, score) VALUES (?, ?, ?, ?, ?);',
            [
                data.userId, 
                data.missionId, 
                data.userMissionId, 
                data.rvContent, 
                data.score
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

export const getReview = async(reviewId) => {
    const conn = await pool.getConnection();
    try {
        const [review] = await pool.query(`SELECT * FROM review WHERE id = ?`, reviewId);
        console.log(review);
        if (review.length == 0) {
            return null;
        }
        return review;
    } catch(err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }

};


