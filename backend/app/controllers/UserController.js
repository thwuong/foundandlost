require("dotenv").config();
const db = require("../models/index");
const { Op } = require("sequelize");
const { uploadSingle } = require("../utils/cloudinary");
const { createError } = require("../utils/createError");
const Cryptr = require("cryptr");

class UserController {
  // DESC [add a user]
  // @URL [POST] /api/user/
  // body : [password, email, fullName, phone, address]
  async createUser(req, res, next) {
    const { idNumber, password, fullName, phone, email } = req.body;
    if (!idNumber) {
      return next(createError(400, "Vui lòng nhập mã số"));
    }
    if (!password) {
      return next(createError(400, "Vui lòng nhập mật khẩu"));
    }
    if (!fullName) {
      return next(createError(400, "Vui lòng nhập tên đầy đủ"));
    }

    try {
      const oldUser = await db.User.findOne({
        where: { idNumber },
        raw: true,
      });
      if (oldUser) {
        return next(createError(401, `Người dùng ${idNumber} đã tồn tại!`));
      }
      const cryptr = new Cryptr(process.env.HASH_KEY);
      const hashPassword = cryptr.encrypt(password);
      console.log("password", password, "hash", hashPassword);
      const newUser = await db.User.create({
        idNumber: idNumber.toLowerCase(),
        password: hashPassword,
        email,
        fullName,
        phone,
        avatar:
          "https://res.cloudinary.com/dmf8jfmss/image/upload/v1676877734/avatar/graduate-student-avatar_tf7dwq.png",
      });

      const user = await db.User.findByPk(newUser.id, { raw: true });

      res.status(200).json({
        success: true,
        message: `Tạo người dùng ${user.idNumber} thành công!`,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [edit a user]
  // @URL [PUT] /api/user/:userId
  // body : [password, email, fullName, phone, address]
  async editUser(req, res, next) {
    const userId = req.params.userId;
    const { password, fullName, phone, email } = req.body;
    if (!password) {
      return next(createError(400, "Vui lòng nhập mật khẩu"));
    }
    if (!fullName) {
      return next(createError(400, "Vui lòng nhập tên đầy đủ"));
    }
    try {
      const cryptr = new Cryptr(process.env.HASH_KEY);
      const hashPassword = cryptr.encrypt(password);

      console.log("password", password, "hash", hashPassword);

      await db.User.update(
        {
          password: hashPassword,
          fullName,
          phone,
          email,
        },
        { where: { id: userId } }
      );
      const user = await db.User.findByPk(userId, { raw: true });
      res.status(200).json({
        success: true,
        message: `Đã cập nhật tài khoản ${user.idNumber}`,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [get all user]
  // @URL [GET] /api/user/
  async getAllUser(req, res, next) {
    try {
      const users = await db.User.findAll({
        where: {
          isAdmin: false,
        },
        raw: true,
      });
      res.status(200).json({
        success: true,
        message: "Successful",
        users,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [delete a user]
  // @URL [DELETE] /api/user/:userId
  async removeUser(req, res, next) {
    const id = req.params.userId;
    try {
      const deletedUser = await db.User.destroy({ where: { id } });

      res.status(200).json({
        success: true,
        message: `Xóa ${deletedUser} sinh viên thành công!`,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [change user password]
  // @URL [PUT] /api/user/
  // body : [currentPassword, newPassword, comfirmPassword]
  async changePassword(req, res, next) {
    const userId = req.user.userId;
    const { currentPassword, newPassword, comfirmPassword } = req.body;
    const cryptr = new Cryptr(process.env.HASH_KEY);
    try {
      const user = await db.User.findOne({
        where: { id: userId },
        attributes: {
          include: ["password"],
        },
        raw: true,
      });
      if (!currentPassword || !newPassword || !comfirmPassword) {
        return next(createError(401, "Vui lòng không được bỏ trống"));
      }

      if (cryptr.decrypt(user.password) !== currentPassword) {
        return next(createError(401, "Mật khẩu hiện tại không đúng"));
      }
      if (newPassword !== comfirmPassword) {
        return next(createError(401, "Mật khẩu không khớp"));
      }

      const hashPassword = cryptr.encrypt(newPassword);

      const updatedUser = await db.User.update(
        { password: hashPassword },
        {
          where: { id: userId },
        }
      );

      res.status(200).json({
        success: true,
        message: `Đã đổi mật khẩu!`,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [get a user]
  // @URL [GET] /api/user/:userId
  async getUser(req, res, next) {
    const id = req.params.userId;
    try {
      const user = await db.User.findOne({
        where: { id },
        raw: true,
      });
      if (!user) return next(createError(404, "Sinh viên không có trong hệ thống"));
      res.status(200).json({
        success: true,
        message: `Successful`,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [get a user]
  // @URL [GET] /api/user/:userId/full
  async getUserFullInfo(req, res, next) {
    const id = req.params.userId;
    try {
      const userData = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          include: "password",
        },
      });
      if (!userData) return next(createError(404, "Sinh viên không có trong hệ thống"));
      const cryptr = new Cryptr(process.env.HASH_KEY);
      const { password, ...user } = userData;
      user.password = cryptr.decrypt(password);
      res.status(200).json({
        success: true,
        message: `Successful`,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [get user profile]
  // @URL [GET] /api/user/profile
  async getProfile(req, res, next) {
    const userId = req.user.userId;
    try {
      const user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });

      res.status(200).json({
        success: true,
        message: `Tải thông tin thành công`,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [update user profile]
  // @URL [PUT] /api/user/profile
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
      });
      const newUser = await db.User.findByPk(userId, {
        raw: true,
      });
      res.status(200).json({
        success: true,
        message: `Cập nhật thông tin thành công`,
        newUser,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [update user profile]
  // @URL [GET] /api/user/search
  async findUserByName(req, res, next) {
    const keyword = req.query.keyword;
    const userId = req.user.userId;
    try {
      const users = await db.User.findAll({
        where: {
          fullName: { [Op.regexp]: keyword || " " },
          id: {
            [Op.not]: userId,
          },
        },
        raw: true,
        nest: true,
      });

      res.status(200).json({
        success: true,
        message: "Successful",
        users,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
