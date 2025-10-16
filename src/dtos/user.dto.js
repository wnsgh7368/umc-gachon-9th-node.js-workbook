export const bodyToUser = (body) => {
    const birth = new Date(body.birth);

    return {
        email: body.email,
        name: body.name,
        gender: body.gender,
        birth,
        address: body.address || "",
        detailAddress: body.detailAddress || "",
        phoneNumber: body.phoneNumber,
        preferences: body.preferences || "",
    }
}

export const responseFromUser = ({user, preferences}) => {
    // user가 배열인 경우 첫 번째 요소 사용
    const userData = Array.isArray(user) ? user[0] : user;
    
    return {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        gender: userData.gender,
        birth: userData.birth,
        address: userData.address,
        detailAddress: userData.detail_address,
        phoneNumber: userData.phone_number,
        preferences: preferences,
    }
}