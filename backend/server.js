require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./app/middlewares/errorHandler");
const { createError } = require("./app/utils/createError");
const { connectDB } = require("./app/utils/connectDB");
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

connectDB();
// Start Routes
app.use("/api/user", require("./app/routes/userRouter"));
app.use("/api/auth", require("./app/routes/authRouter"));
app.use("/api/category", require("./app/routes/categoryRouter"));
// End Routes
app.all("*", (req, res, next) => {
  next(createError(404, "Không tìm thấy nguồn!"));
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
