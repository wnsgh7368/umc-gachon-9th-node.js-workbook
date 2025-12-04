import { responseFromUser, responseFromUpdatedUser } from "../dtos/user.dto.js";
import { DuplicateUserEmailError } from "../errors.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  updateUser,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser(data);

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  // preferences가 배열인지 확인
  if (data.preferences && Array.isArray(data.preferences) && data.preferences.length > 0) {
    for (const preference of data.preferences) {
      await setPreference(joinUserId, preference);
    }
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

// 사용자 정보 수정
export const updateUserInfo = async (userId, data) => {
  const updatedUser = await updateUser(userId, data);
  return responseFromUpdatedUser(updatedUser);
};