export const bodyToReview = (body) => {
    return {
        userId: body.userId, 
        missionId: body.missionId, 
        userMissionId: body.userMissionId, 
        content: body.content,
        score: body.score
    }
}

export const responseFromReview = (review) => {
    const reviewData = Array.isArray(review) ? review[0] : review;
    return {
        id: reviewData.id,
        userId: reviewData.user_id,           // DB 컬럼명: user_id
        missionId: reviewData.mission_id,     // DB 컬럼명: mission_id
        userMissionId: reviewData.user_mission_id, // DB 컬럼명: user_mission_id
        rvContent: reviewData.rv_content,     // DB 컬럼명: rv_content
        score: reviewData.score,
        createdAt: reviewData.created_at,     // 생성 시간 추가
        updatedAt: reviewData.updated_at      // 수정 시간 추가
    }
}