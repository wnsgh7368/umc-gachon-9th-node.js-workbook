export const bodyToMission = (body) => {
    return {
        userId: body.userId,
        storeId: body.storeId,
        content: body.content,
        point: body.point
    }
}

export const responseFromMission = (mission) => {
    const missionData = Array.isArray(mission) ? mission[0] : mission;
    return {
        id: missionData.id,
        storeId: missionData.store_id,
        content: missionData.content,
        point: missionData.point,
        createdAt: missionData.created_at,
        updatedAt: missionData.updated_at
    }
}

