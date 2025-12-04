import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToUpdateUser } from "../dtos/user.dto.js";
import { userSignUp, updateUserInfo } from "../services/user.service.js";
import { asyncHandler } from "../utils/error.js";

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     tags: [Users]
 *     summary: 회원가입
 *     description: 새로운 사용자를 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - gender
 *               - birth
 *               - phoneNumber
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               name:
 *                 type: string
 *                 example: 홍길동
 *               gender:
 *                 type: string
 *                 example: male
 *               birth:
 *                 type: string
 *                 example: 2000-01-01
 *               address:
 *                 type: string
 *                 example: 서울시 강남구
 *               detailAddress:
 *                 type: string
 *                 example: 101동 101호
 *               phoneNumber:
 *                 type: string
 *                 example: 010-1234-5678
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       200:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: SUCCESS
 *                 error:
 *                   type: null
 *                 success:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       example: 홍길동
 *                     preferCategory:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [한식, 중식]
 *       400:
 *         description: 회원가입 실패 (이메일 중복 등)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: FAIL
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: U001
 *                     reason:
 *                       type: string
 *                       example: 이미 존재하는 이메일입니다.
 *                 success:
 *                   type: null
 */
export const handleUserSignUp = asyncHandler(async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
});

/**
 * @swagger
 * /api/v1/users/me:
 *   patch:
 *     tags: [Users]
 *     summary: 내 정보 수정
 *     description: 로그인한 사용자의 정보를 수정합니다. (Google 로그인 후 추가 정보 입력용)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 홍길동
 *               gender:
 *                 type: string
 *                 example: male
 *               birth:
 *                 type: string
 *                 example: 2000-01-01
 *               address:
 *                 type: string
 *                 example: 서울시 강남구
 *               detailAddress:
 *                 type: string
 *                 example: 101동 101호
 *               phoneNumber:
 *                 type: string
 *                 example: 010-1234-5678
 *     responses:
 *       200:
 *         description: 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: SUCCESS
 *                 error:
 *                   type: null
 *                 success:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       example: 홍길동
 *                     gender:
 *                       type: string
 *                       example: male
 *                     birth:
 *                       type: string
 *                       example: 2000-01-01
 *                     address:
 *                       type: string
 *                       example: 서울시 강남구
 *                     detailAddress:
 *                       type: string
 *                       example: 101동 101호
 *                     phoneNumber:
 *                       type: string
 *                       example: 010-1234-5678
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: FAIL
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: AUTH001
 *                     reason:
 *                       type: string
 *                       example: 인증이 필요합니다.
 */
export const handleUpdateMyInfo = asyncHandler(async (req, res, next) => {
  console.log("내 정보 수정을 요청했습니다!");
  console.log("userId:", req.user.id);
  console.log("body:", req.body);

  const userId = req.user.id; // JWT에서 추출한 사용자 ID
  const updatedUser = await updateUserInfo(userId, bodyToUpdateUser(req.body));
  res.status(StatusCodes.OK).success(updatedUser);
});