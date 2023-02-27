const Router = require("express").Router();
const RequestController = require("../controllers/RequestController");
const { verifyToken } = require("../middlewares/verifyToken");

Router.post("/:postId/create", verifyToken, RequestController.postRequest);
Router.put(
  "/:postId/update/:id",
  verifyToken,
  RequestController.updateStatusRequest
);
Router.delete("/:id/delete", verifyToken, RequestController.deleteRequest);
Router.get("/me", verifyToken, RequestController.getMyRequests);
Router.get("/:id", verifyToken, RequestController.getRequest);
Router.get("/:postId", verifyToken, RequestController.getRequestByMyPost);

module.exports = Router;
