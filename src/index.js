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
import swaggerUiExpress from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import passport from "passport";
import { googleStrategy, jwtStrategy } from "./auth.config.js";
passport.use(googleStrategy);

dotenv.config();

passport.use(googleStrategy);
passport.use(jwtStrategy); 

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

// Swagger 설정
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UMC 9th API',
      version: '1.0.0',
      description: 'UMC 9th Node.js 테스트 프로젝트 API 문서',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '로컬 서버',
      },
    ],
  },
  apis: ['./src/contollers/*.js', './src/index.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.get("/oauth2/login/google", 
  passport.authenticate("google", { 
    session: false 
  })
);

app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
	  session: false,
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    const tokens = req.user; 

    res.status(200).json({
      resultType: "SUCCESS",
      error: null,
      success: {
          message: "Google 로그인 성공!",
          tokens: tokens, // { "accessToken": "...", "refreshToken": "..." }
      }
    });
  }
);

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));

app.use(cors({
  origin: ['http://localhost:3000', 'http://example.com', 'http://127.0.0.1:3002']
})); // cors 방식 허용

app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//API
app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/reviews", handleUserReview);
app.post("/api/v1/stores/:storeId/missions", handleAddMission);
app.get("/api/v1/stores/:storeId/reviews", handleListReviews);
app.get("/api/v1/me/reviews", handleMyReviews);
app.get("/api/v1/me/challenge-missions", handleMyMissions);

const isLogin = passport.authenticate('jwt', { session: false });

app.get('/mypage', isLogin, (req, res) => {
  res.status(200).success({
    message: `인증 성공! ${req.user.name}님의 마이페이지입니다.`,
    user: req.user,
  });
});

// 에러 핸들러 미들웨어 (모든 라우트 이후에 등록)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})