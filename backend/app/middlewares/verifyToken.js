const { createError } = require("../utils/createError");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authToken = req.headers["authorization"];
  const token = authToken && authToken.split(" ")[1];
  if (!token) {
    return next(createError(401, "Người dùng chưa đăng nhập"));
  }
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user) return next(createError(401, "Người dùng chưa đăng nhập"));
    if (!req.user?.isAdmin) {
      return next(createError(402, "Không có quyền quản trị viên"));
    }
    next();
  });
};
module.exports = {
  verifyToken,
  verifyTokenAdmin,
};
