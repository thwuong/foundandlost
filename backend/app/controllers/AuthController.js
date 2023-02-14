require("dotenv").config();
const db = require("../models/index");
const { createError } = require("../utils/createError");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
class AuthController {
  async login(req, res, next) {
    const { code, password } = req.body;

    if (!code || !password) {
      return next(
        createError(401, "Trường mật khẩu hoặc mã số sinh viên bị thiếu!")
      );
    }
    try {
      const user = await db.User.findOne({ where: { code } });

      if (!user) {
        return next(createError(401, "Người dùng không có trong hệ thống!"));
      }
      const invalidPassword = await argon2.verify(user.password, password);
      if (!invalidPassword) {
        return next(createError(401, "Mật khẩu không đúng!"));
      }
      const token = jwt.sign(
        {
          userId: user.userId,
          isAdmin: user.isAdmin,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        success: true,
        message: `Đăng nhập thành công!`,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
  refeshToken(req, res, next) {
    res.json({
      success: true,
      message: "thong diep",
    });
  }
}

module.exports = new AuthController();
