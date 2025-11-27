import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
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