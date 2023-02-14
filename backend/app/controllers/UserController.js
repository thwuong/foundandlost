require("dotenv").config();
const db = require("../models/index");
const { createError } = require("../utils/createError");
const argon2 = require("argon2");
class UserController {
  async createUser(req, res, next) {
    const { code, password, email, fullName, phone } = req.body;
    if (!code) {
      return next(createError(401, "Trường mã số sinh viên bị thiếu!"));
    }
    if (!password) {
      return next(createError(401, "Trường mật khẩu bị thiếu!"));
    }
    try {
      const hashPassword = await argon2.hash(password);
      const newUser = {
        code,
        password: hashPassword,
        email,
        fullName,
        phone,
      };

      const user = await db.User.create(newUser);

      res.status(200).json({
        success: true,
        message: `Tạo người dùng ${user.code} thành công!`,
      });
    } catch (error) {
      next(error);
    }
  }
  getAllUser(req, res, next) {
    res.json({
      success: true,
      message: "get All",
    });
  }
  removeUser(req, res, next) {
    res.json({
      success: true,
      message: "thong diep",
    });
  }
}

module.exports = new UserController();
