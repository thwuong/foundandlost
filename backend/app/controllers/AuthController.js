require("dotenv").config();
const db = require("../models/index");
const { createError } = require("../utils/createError");
const Cryptr = require("cryptr");
const jwt = require("jsonwebtoken");
class AuthController {
  async login(req, res, next) {
    const { idNumber, password } = req.body;

    if (!idNumber || !password) {
      return next(createError(401, "Vui lòng nhập mã số và mật khẩu"));
    }
    try {
      const user = await db.User.findOne({
        where: { idNumber },
        attributes: { include: ["password"] },
        raw: true,
      });

      if (!user) {
        return next(createError(401, "Người dùng không có trong hệ thống"));
      }
      const cryptr = new Cryptr(process.env.HASH_KEY);
      const invalidPassword = cryptr.decrypt(user.password) === password;
      if (!invalidPassword) {
        return next(createError(401, "Mật khẩu không đúng"));
      }
      const accessToken = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5m",
      });
      const refreshToken = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin },
        process.env.ACCESS_REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      delete user.password;
      res.status(200).json({
        success: true,
        message: `Đăng nhập thành công`,
        accessToken,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.jwt;
      if (!refreshToken) {
        return next(createError(401, "Người dùng chưa đăng nhập"));
      }

      const user = jwt.verify(refreshToken, process.env.ACCESS_REFRESH_TOKEN_SECRET);
      const accessToken = jwt.sign({ userId: user.userId, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5m",
      });
      res.status(200).json({
        success: true,
        message: "Refresh token successfully",
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
  logout(req, res, next) {
    res.clearCookie("jwt");
    res.status(200).json({
      success: true,
      message: "Đăng xuất thành công",
    });
  }
}

module.exports = new AuthController();
