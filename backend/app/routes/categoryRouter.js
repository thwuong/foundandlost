const Router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const { verifyToken, adminPermision } = require("../middlewares/verifyToken");

Router.post("/", verifyToken, adminPermision, CategoryController.addCategory);
Router.delete(
  "/:categoryId",
  verifyToken,
  adminPermision,
  CategoryController.deleteCategory
);
Router.put(
  "/:categoryId",
  verifyToken,
  adminPermision,
  CategoryController.editCategory
);
Router.get("/:categoryId", CategoryController.getCategory);
Router.get("/", CategoryController.getAllCategory);

module.exports = Router;
