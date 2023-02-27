require("dotenv").config();
const db = require("../models/index");
const { createError } = require("../utils/createError");
const Cryptr = require("cryptr");
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
      const user = await db.User.findOne({
        where: { code },
        raw: true,
        attributes: { include: ["password"] },
      });

      if (!user) {
        return next(createError(401, "Người dùng không có trong hệ thống!"));
      }
      const cryptr = new Cryptr(process.env.HASH_KEY);
      const invalidPassword = cryptr.decrypt(user.password) === password;
      if (!invalidPassword) {
        return next(createError(401, "Mật khẩu không đúng!"));
      }
      const accessToken = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      const refeshToken = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.cookie("jwt", refeshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      delete user.password;
      res.status(200).json({
        success: true,
        message: `Đăng nhập thành công!`,
        accessToken,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  refeshToken(req, res, next) {
    const refeshToken = req.cookies.jwt;
    if (!refeshToken) {
      return next(createError(400, "Người dùng chưa đăng nhập"));
    }
    try {
      const user = jwt.verify(refeshToken, process.env.ACCESS_TOKEN_SECRET);
      const accessToken = jwt.sign(
        { userId: user.userId, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "10m",
        }
      );
      res.status(200).json({
        success: true,
        message: "refesh token successfully!",
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
      message: "Đăng xuất thành công!",
    });
  }
}

module.exports = new AuthController();
