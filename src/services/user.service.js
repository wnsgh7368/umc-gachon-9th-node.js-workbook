import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  }); // addUser 함수를 통해 사용자를 추가하고 반환된 사용자 ID(return 값)를 joinUserId에 저장. 따라서 joinUserId는 사용자 ID를 의미.

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  } // 이미 존재하는 이메일이면 null값을 반환하기 때문에 에러 발생

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  } // setPreference 함수를 통해 사용자 선호 카테고리를 추가.

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};