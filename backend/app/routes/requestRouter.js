const Router = require("express").Router();
const RequestController = require("../controllers/RequestController");
const { verifyToken } = require("../middlewares/verifyToken");

Router.post("/", verifyToken, RequestController.postRequest);
Router.put("/:requestId", verifyToken, RequestController.updateStatusRequest);
Router.delete("/:requestId", verifyToken, RequestController.deleteRequest);
Router.get("/myrequest", verifyToken, RequestController.getMyRequests);
Router.get("/:requestId", verifyToken, RequestController.getRequest);
Router.get("/:postId", verifyToken, RequestController.getRequestByPostId);
Router.get("/", verifyToken, RequestController.getAllRequest);

module.exports = Router;
