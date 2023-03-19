const db = require("../models/index");
const { createError } = require("../utils/createError");
class RequestController {
  // DESC [post a request]
  // @URL [POST] /api/request/
  // body : [desc,postId]
  async postRequest(req, res, next) {
    const userId = req.user.userId;
    const { desc, postId } = req.body;

    if (!desc) return next(createError(400, "Trường mô tả yêu cầu bị trống!"));
    try {
      const newRequest = await db.Request.create({
        userId,
        postId: Number(postId),
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
  // DESC [put request]
  // @URL [PUT] /api/request/:requestId
  // body : [status,postId]
  async updateStatusRequest(req, res, next) {
    const { requestId } = req.params;
    const { status, postId } = req.body;
    try {
      const updatedRequest = await db.Request.update({
        where: {
          id: requestId,
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
  // DESC [delete a request]
  // @URL [PUT] /api/request/:requestId
  // param requestId
  async deleteRequest(req, res, next) {
    const id = req.params.requestId;
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
    const id = req.params.requestId;
    try {
      const request = await db.Request.findOne({
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
      const requests = await db.Request.findAll({
        where: { userId },
        raw: true,
        nest: true,
        include: [
          {
            model: db.User,
            as: "author",
            attributes: ["fullName", "email", "avatar"],
          },
          {
            model: db.Post,
            as: "post",
            attributes: ["title"],
          },
        ],
      });
      res.status(200).json({
        success: true,
        message: "Láy danh sách yêu cầu của tôi thành công!",
        requests,
      });
    } catch (error) {
      next(error);
    }
  }
  async getRequestByPostId(req, res, next) {
    const postId = req.params.postId;
    try {
      const requests = await db.Request.findAll({
        where: {
          postId,
        },
        raw: true,
        nest: true,
      });
      res.status(200).json({
        success: true,
        message: "Lấy yêu cầu cho tôi thành công!",
        requests,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllRequest(req, res, next) {
    try {
      const requests = await db.Request.findAll({
        raw: true,
        nest: true,
        include: [
          {
            model: db.User,
            as: "author",
            attributes: ["fullName", "email", "avatar"],
          },
          {
            model: db.Post,
            as: "post",
            attributes: ["title"],
          },
        ],
      });
      res.status(200).json({
        success: true,
        message: "Lấy yêu cầu cho tôi thành công!",
        requests,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RequestController();
