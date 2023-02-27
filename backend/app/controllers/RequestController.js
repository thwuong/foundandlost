const db = require("../models/index");
const { createError } = require("../utils/createError");
class RequestController {
  //  Route /api/request/create
  //  Params postId
  //  Body
  async postRequest(req, res, next) {
    const userId = req.user.userId;
    const postId = req.params.postId;
    const desc = req.body.desc;

    if (!desc) return next(createError(400, "Trường mô tả yêu cầu bị trống!"));
    try {
      const newRequest = await db.Request.create({
        userId,
        postId,
        desc,
      });
      res.status(200).json({
        success: true,
        message: "Tạo thành Công!",
        newRequest,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateStatusRequest(req, res, next) {
    const { id, postId } = req.params;
    const status = req.body.status;
    try {
      const updatedRequest = await db.Request.update({
        where: {
          id,
        },
        status,
      });
      if (status === "accepted") {
        await db.Post.update({ where: { postId }, status: "confirmed" });
      }

      res.status(200).json({
        success: true,
        message: "Cập nhật thành công!",
        updatedRequest,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteRequest(req, res, next) {
    const { id } = req.params;
    try {
      const deletedRequest = await db.Request.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        success: true,
        message: "Xóa thành công!",
        deletedRequest,
      });
    } catch (error) {
      next(error);
    }
  }
  async getRequest(req, res, next) {
    const id = req.params.id;
    try {
      const request = await db.Request.findAll({
        where: {
          id,
        },
      });
      res.status(200).json({
        success: true,
        message: "Lấy yêu cầu thành công!",
        request,
      });
    } catch (error) {
      next(error);
    }
  }
  async getMyRequests(req, res, next) {
    const userId = req.user.userId;
    try {
      const myRequest = await db.Request.findAll({ where: { userId } });
      res.status(200).json({
        success: true,
        message: "Láy danh sách yêu cầu của tôi thành công!",
        myRequest,
      });
    } catch (error) {
      next(error);
    }
  }
  async getRequestByMyPost(req, res, next) {
    const postId = req.params.postId;
    try {
      const requestPost = await db.Request.findAll({
        where: {
          postId,
        },
      });
      res.status(200).json({
        success: true,
        message: "Lấy yêu cầu cho tôi thành công!",
        requestPost,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RequestController();
