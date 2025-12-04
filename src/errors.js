// User 관련 에러
export class DuplicateUserEmailError extends Error {
  errorCode = "U001";
  statusCode = 409;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// Review 관련 에러
export class DuplicateReviewError extends Error {
  errorCode = "R001";
  statusCode = 409;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// Store 관련 에러
export class StoreNotFoundError extends Error {
  errorCode = "S001";
  statusCode = 404;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class InvalidStoreIdError extends Error {
  errorCode = "S002";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// Mission 관련 에러
export class MissionNotFoundError extends Error {
  errorCode = "M001";
  statusCode = 404;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MissionAlreadyChallengedError extends Error {
  errorCode = "M002";
  statusCode = 409;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// User 관련 에러
export class UserNotFoundError extends Error {
  errorCode = "U002";
  statusCode = 404;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MissingUserIdError extends Error {
  errorCode = "U003";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 공통 에러
export class InvalidParamsError extends Error {
  errorCode = "C001";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

