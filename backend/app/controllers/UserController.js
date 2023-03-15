require("dotenv").config();
const db = require("../models/index");
const { uploadSingle } = require("../utils/cloudinary");
const { createError } = require("../utils/createError");
const Cryptr = require("cryptr");

class UserController {
  // DESC [add a user]
  // @URL [POST] /api/user/
  // body : [password, email, fullName, phone, address]
  async createUser(req, res, next) {
    const { idNumber, password, fullName, phone, address } = req.body;
    if (!idNumber) {
      return next(createError(401, "Trường mã số sinh viên bị bỏ trống!"));
    }
    if (!password) {
      return next(createError(401, "Trường mật khẩu bị bỏ trống!"));
    }
    if (!fullName) {
      return next(createError(401, "Trường họ và tên bị bỏ trống!"));
    }
    try {
      const oldUser = await db.User.findOne({
        where: { idNumber },
      });
      if (oldUser) {
        return next(createError(401, `Người dùng ${idNumber} đã tồn tại!`));
      }
      const cryptr = new Cryptr(process.env.HASH_KEY);
      const hashPassword = cryptr.encrypt(password);
      const newUser = {
        idNumber,
        password: hashPassword,
        email: `${fullName} + ${idNumber}@gmail.com`,
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
        message: "Lấy danh sách sinh viên thành công!",
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
        deletedUser,
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
      const user = db.User.findOne({
        where: { id: userId },
        attributes: {
          include: ["password"],
        },
      });
      if (!currentPassword || !newPassword || !comfirmPassword) {
        return next(createError(401, "Vui lòng không được bỏ trống!"));
      }

      if (cryptr.decrypt(user.password) !== currentPassword) {
        return next(createError(401, "Mật khẩu hiện tại không đúng!"));
      }
      if (newPassword !== comfirmPassword) {
        return next(createError(401, "Mật khẩu không khớp!"));
      }

      const hashPassword = cryptr.encrypt(newPassword);

      let updatedUser = {
        password: hashPassword,
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
  // DESC [get a user]
  // @URL [GET] /api/user/:userId
  async getUser(req, res, next) {
    const id = req.params.userId;
    try {
      const user = await db.User.findOne({
        where: { id },
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
  // DESC [get user profile]
  // @URL [GET] /api/user/profile
  async getProfile(req, res, next) {
    const userId = req.user.userId;
    try {
      const user = await db.User.findOne({
        where: { id: userId },
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
