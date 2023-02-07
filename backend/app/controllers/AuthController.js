const Auth = require("../models/authModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
class AuthController {
  async createUser(req, res, next) {
    const { code, password, email, fullName, isManagement } = req.body;

    if (!code) {
      const err = new Error("Trường mã số sinh viên bị thiếu!");
      err.statusCode = 400;
      return next(err);
    }
    if (!password) {
      const err = new Error("Trường mật khẩu bị thiếu!");
      err.statusCode = 400;
      return next(err);
    }
    try {
      const hashPassword = await argon2.hash(password);
      const newUser = {
        code,
        password: hashPassword,
        email,
        fullName,
        isManagement: isManagement || false,
      };

      const user = await Auth.create(newUser);

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
  async login(req, res, next) {
    const { code, password } = req.body;

    if (!code || !password) {
      const err = new Error("Trường mật khẩu hoặc mã số sinh viên bị thiếu!");
      err.statusCode = 400;
      return next(err);
    }
    try {
      const user = await Auth.findOne({ where: { code } });

      if (!user) {
        const err = new Error("Người dùng không có trong hệ thống!");
        err.statusCode = 400;
        return next(err);
      }
      const invalidPassword = await argon2.verify(user.password, password);
      if (!invalidPassword) {
        const err = new Error("Mật khẩu không đúng!");
        err.statusCode = 400;
        return next(err);
      }
      const token = jwt.sign(
        {
          userId: user.iduser,
          isAdmin: user.isAdmin,
          isManagement: user.isManagement,
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
