const Router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const { verifyTokenAdmin } = require("../middlewares/verifyToken");

Router.post("/add", verifyTokenAdmin, CategoryController.addCategory);
Router.delete(
  "/:id/delete",
  verifyTokenAdmin,
  CategoryController.deleteCategory
);
Router.put("/:id/edit", verifyTokenAdmin, CategoryController.editCategory);
Router.get("/:id", CategoryController.getCategory);
Router.get("/", CategoryController.getAllCategory);

module.exports = Router;
