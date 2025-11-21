//const express = require('express')
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { handleUserSignUp } from "./contollers/user.controller.js";
import { handleUserReview } from "./contollers/review.controller.js";
import { handleAddMission } from "./contollers/mission.controller.js";
import { handleListReviews } from "./contollers/store.controller.js";
import { handleMyReviews, handleMyMissions } from "./contollers/me.controller.js";
import { errorHandler } from "./utils/error.js";

dotenv.config();

const app = express()
const port = process.env.PORT;

app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/api/v1/auth/signup", handleUserSignUp);
app.post("/api/v1/reviews", handleUserReview);
app.post("/api/v1/stores/:storeId/missions", handleAddMission); //미션 등록
//미션 도전
app.get("/api/v1/stores/:storeId/reviews", handleListReviews); //특정 가게의 미션 목록
app.get("/api/v1/me/reviews", handleMyReviews); //내가 작성한 리뷰 띄우기
app.get("/api/v1/me/challenge-missions", handleMyMissions); //내가 진행중인 미션 목록 띄우기

// 에러 핸들러 미들웨어 (모든 라우트 이후에 등록)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})