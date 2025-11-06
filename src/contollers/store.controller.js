import { StatusCodes } from "http-status-codes";
import { listStoreReview } from "../services/store.service.js";

export const handleListReviews = async (req, res, next) => {
    try {
        const reviews = await listStoreReview(
            parseInt(req.params.storeId),
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        res.status(StatusCodes.OK).json({ result: reviews });
    } catch (error) {
        next(error);
    }
}