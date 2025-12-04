export const bodyToUser = (body) => {
    const birth = new Date(body.birth);

    return {
        email: body.email,
        name: body.name,
        gender: body.gender,
        birth,
        point: body.point || 0,
        address: body.address || "",
        detailAddress: body.detailAddress || "",
        phoneNumber: body.phoneNumber,
        preferences: body.preferences || [],
    }
}
export const responseFromUser = ({ user, preferences }) => {
    const preferFoods = preferences.map(
      (preference) => preference.foodCategory.name
    );
  
    return {
      email: user.email,
      name: user.name,
      preferCategory: preferFoods,
    };
  };

// 사용자 정보 수정용 DTO
export const bodyToUpdateUser = (body) => {
    const updateData = {};
    
    // NOT NULL 필드 검증
    if (body.name !== undefined) {
        if (!body.name || body.name.trim() === "") {
            throw new Error("name은 빈 값일 수 없습니다.");
        }
        updateData.name = body.name.trim();
    }
    
    if (body.gender !== undefined) {
        if (!body.gender || body.gender.trim() === "") {
            throw new Error("gender는 빈 값일 수 없습니다.");
        }
        updateData.gender = body.gender.trim();
    }
    
    if (body.birth !== undefined) {
        if (!body.birth) {
            throw new Error("birth는 빈 값일 수 없습니다.");
        }
        updateData.birth = new Date(body.birth);
    }
    
    if (body.address !== undefined) {
        if (!body.address || body.address.trim() === "") {
            throw new Error("address는 빈 값일 수 없습니다.");
        }
        updateData.address = body.address.trim();
    }
    
    if (body.phoneNumber !== undefined) {
        if (!body.phoneNumber || body.phoneNumber.trim() === "") {
            throw new Error("phoneNumber는 빈 값일 수 없습니다.");
        }
        updateData.phoneNumber = body.phoneNumber.trim();
    }
    
    // NULLABLE 필드
    if (body.detailAddress !== undefined) {
        updateData.detailAddress = body.detailAddress;
    }
    
    return updateData;
};

// 사용자 정보 응답용 DTO
export const responseFromUpdatedUser = (user) => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        gender: user.gender,
        birth: user.birth,
        address: user.address,
        detailAddress: user.detailAddress,
        phoneNumber: user.phoneNumber,
    };
};