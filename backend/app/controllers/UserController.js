require("dotenv").config();
const db = require("../models/index");
const { uploadSingle } = require("../utils/cloudinary");
const { createError } = require("../utils/createError");
const Cryptr = require("cryptr");
class UserController {
  async createUser(req, res, next) {
    const { code, password, email, fullName, phone, address } = req.body;
    if (!code) {
      return next(createError(401, "Trường mã số sinh viên bị thiếu!"));
    }
    if (!password) {
      return next(createError(401, "Trường mật khẩu bị thiếu!"));
    }
    try {
      const oldUser = await db.User.findOne({
        where: { code },
      });
      if (oldUser) {
        return next(createError(401, `Người dùng ${code} đã tồn tại!`));
      }
      const cryptr = new Cryptr(process.env.HASH_KEY);
      const hashPassword = cryptr.encrypt(password);
      const newUser = {
        code,
        password: hashPassword,
        email,
        fullName,
        address,
        phone,
        avatar:
          "https://res.cloudinary.com/dmf8jfmss/image/upload/v1676877734/avatar/graduate-student-avatar_tf7dwq.png",
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
  async getAllUser(req, res, next) {
    try {
      const users = await db.User.findAll({
        where: {
          isAdmin: false,
        },
        attributes: { include: ["password"] },
        raw: true,
      });
      let convertUsers = users.map((user) => {
        let { password, ...rest } = user;
        const cryptr = new Cryptr(process.env.HASH_KEY);
        password = cryptr.decrypt(password);
        return { ...rest, password };
      });

      res.status(200).json({
        success: true,
        message: "Lấy danh sách sinh viên thành công!",
        convertUsers,
      });
    } catch (error) {
      next(error);
    }
  }
  async removeUser(req, res, next) {
    const id = req.params.id;
    try {
      const deletedUser = await db.User.destroy({ where: { id } });

      res.status(200).json({
        success: true,
        message: `Xóa ${deletedUser} sinh viên thành công!`,
        deletedUser,
      });
    } catch (error) {
      next(error);
    }
  }
  async editUser(req, res, next) {
    const id = req.params.id;
    const { code, password, email, fullName, phone, address } = req.body;
    try {
      let hashPassword;
      if (password) {
        const cryptr = new Cryptr(process.env.HASH_KEY);
        hashPassword = cryptr.encrypt(password);
      }
      let updatedUser = {
        code,
        password: hashPassword,
        email,
        fullName,
        phone,
        address,
      };
      updatedUser = await db.User.update(updatedUser, {
        where: { id },
        raw: true,
      });

      res.status(200).json({
        success: true,
        message: `Cập nhật sinh viên thành công!`,
      });
    } catch (error) {
      next(error);
    }
  }
  async getUser(req, res, next) {
    const id = req.params.id;
    try {
      const user = await db.User.findOne({
        where: { id },
        attributes: { exclude: ["password"] },
        raw: true,
      });
      const { password, ...userCurrent } = user;
      res.status(200).json({
        success: true,
        message: `Lấy thông tin sinh viên thành công!`,
        userCurrent,
      });
    } catch (error) {
      next(error);
    }
  }
  async getProfile(req, res, next) {
    const userId = req.user.userId;
    try {
      const user = await db.User.findOne({
        where: { id: userId },
        attributes: { exclude: ["password"] },
        raw: true,
      });

      res.status(200).json({
        success: true,
        message: `Lấy thông tin sinh viên thành công!`,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProfile(req, res, next) {
    const userId = req.user.userId;
    const { phone, address } = req.body;
    let avatar;
    try {
      if (req.file) {
        avatar = await uploadSingle(req.file.path);
      }
      let userUpdated = {
        phone,
        address,
        avatar: avatar && avatar.url,
      };
      userUpdated = await db.User.update(userUpdated, {
        where: { id: userId },
        raw: true,
      });
      res.status(200).json({
        success: true,
        message: `Cập nhật thông tin thành công!`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
