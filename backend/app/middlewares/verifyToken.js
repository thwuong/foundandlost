const jwt = require("jsonwebtoken");

exports.verifyUser = function (req, res, next) {
  const authToken = req.headers["authorization"];
  const token = authToken && authToken.split(" ")[1];
  if (!token) {
    const err = new Error("Người dùng chưa đăng nhập");
    err.statusCode = 401;
    return next(err);
  }
  try {
    const { iduser } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.userId = iduser;

    next();
  } catch (error) {
    next(error);
  }
};
exports.verifyAdmin = function (req, res, next) {
  const authToken = req.headers["authorization"];
  const token = authToken && authToken.split(" ")[1];

  if (!token) {
    const err = new Error("Người dùng chưa đăng nhập");
    err.statusCode = 401;
    return next(err);
  }
  try {
    const { isAdmin, iduser } = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!isAdmin) {
      const err = new Error("Người dùng không có quyền");
      err.statusCode = 402;
      return next(err);
    }

    req.userId = iduser;
    next();
  } catch (error) {
    next(error);
  }
};
exports.verifyManagement = function (req, res, next) {
  const authToken = req.headers["authorization"];
  const token = authToken && authToken.split(" ")[1];

  if (!token) {
    const err = new Error("Người dùng chưa đăng nhập");
    err.statusCode = 401;
    return next(err);
  }
  try {
    const { iduser, isManagement } = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!isManagement) {
      const err = new Error("Người dùng không có quyền");
      err.statusCode = 402;
      return next(err);
    }
    req.userId = iduser;

    next();
  } catch (error) {
    next(error);
  }
};
