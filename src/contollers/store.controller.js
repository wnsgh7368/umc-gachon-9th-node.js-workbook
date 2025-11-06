export const handleListReviews = async (req, res, next) => {
    const reviews = await listStoreReview(
        req.params.storeId
    );
    res.status(StatusCodes.OK).json(reviews)
}