import { responseFromReviews, responseFromMissionsOfStore } from "../dtos/store.dto.js";
import { getAllStoreReviews, getAllStoreMissions } from "../repositories/store.repository.js";
import { StoreNotFoundError, InvalidStoreIdError } from "../errors.js";

export const listStoreReview = async (storeId, cursor) => {
    if (!storeId || isNaN(storeId)) {
        throw new InvalidStoreIdError("유효하지 않은 storeId입니다.", { storeId });
    }
    
    const reviews = await getAllStoreReviews(storeId, cursor);
    return responseFromReviews(reviews);
}

export const listStoreMission = async (storeId, cursor) => {
    if (!storeId || isNaN(storeId)) {
        throw new InvalidStoreIdError("유효하지 않은 storeId입니다.", { storeId });
    }
    
    const missions = await getAllStoreMissions(storeId, cursor);
    return responseFromMissionsOfStore(missions);
}