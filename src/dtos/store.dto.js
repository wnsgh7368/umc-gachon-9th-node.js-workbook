export const responseFromReviews = (reviews) => {
    return {
      data: reviews,
      pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
      },
    };
  };

export const responseFromMissionsOfStore = (missions) => {
    return {
        data: missions,
        pagination: {
            cursor: missions.length ? missions[missions.lengh -1].id : null,
        },
    };
};