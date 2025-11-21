import { StatusCodes } from "http-status-codes";
import { listStoreReview } from "../services/store.service.js";
import { asyncHandler } from "../utils/error.js";
import { InvalidStoreIdError } from "../errors.js";

export const handleListReviews = asyncHandler(async (req, res, next) => {
    const storeId = parseInt(req.params.storeId);
    if (isNaN(storeId)) {
        throw new InvalidStoreIdError("유효하지 않은 storeId입니다.", { storeId: req.params.storeId });
    }

    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;
    const reviews = await listStoreReview(storeId, cursor);
    res.status(StatusCodes.OK).json({ result: reviews });
});

export const handleListStoreMission = async (req, res, next) => {
    try {
        const missions = await listStoreMission(
            parseInt(req.params.storeId),
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        res.status(StatusCodes.OK).json( { result: missions } );
    } catch(error) {
        next(error);
    }
}