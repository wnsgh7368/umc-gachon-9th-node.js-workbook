export const responseFromMyReview = (myReview) => {
    return {
        data: myReview,
        pagination: {
            cursor: myReview.length ? myReview[myReview.length -1].id : null,
        }
    };
}

export const responseFromMissionsOfMe = (missions) => {
    return {
        data: missions,
        pagination: {
            cursor: missions.length ? missions[missions.lengh -1].id : null,
        },
    };
};