require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./app/middlewares/errorHandler");
const { createError } = require("./app/utils/createError");
const { connectDB } = require("./app/utils/connectDB");
const { createRoute } = require("./app/routes/index");
const { serverSocket } = require("./serverSocket");
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.use(cookieParser());

connectDB();
createRoute(app);
serverSocket(app);
app.all("*", (req, res, next) => {
  next(createError(404, "Không tìm thấy nguồn!"));
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
