export const responseFromUserMission = (userMission) => {
    const data = Array.isArray(userMission) ? userMission[0] : userMission;
    return {
        id: data.id,
        userId: data.user_id,
        missionId: data.mission_id,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    }
}
