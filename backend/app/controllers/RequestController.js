const db = require("../models/index");
const { createError } = require("../utils/createError");
class RequestController {
  // DESC [post a request]
  // @URL [POST] /api/request/
  // body : [desc,postId]
  async postRequest(req, res, next) {
    const userId = req.user.userId;
    const { desc, postId } = req.body;

    if (!desc) return next(createError(400, "Vui lòng nhập mô tả yêu cầu"));
    try {
      const newRequest = await db.Request.create({
        userId,
        postId,
        desc,
      });
      res.status(200).json({
        success: true,
        message: "Đã gửi yêu cầu",
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
    const requestId = req.params.requestId;
    const { status, postId } = req.body;
    console.log(status, postId, requestId);
    try {
      await db.Request.update(
        { status },
        {
          where: { id: requestId },
        }
      );
      if (status === "accepted") {
        await db.Post.update({ status: "comfirmed" }, { where: { id: postId } });
      }

      res.status(200).json({
        success: true,
        message: "Đã phản hồi yêu cầu",
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
        message: "Đã xóa yêu cầu",
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
        message: "Successful",
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
        message: "Successful",
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
        message: "Successful",
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
        message: "Successful",
        requests,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RequestController();
