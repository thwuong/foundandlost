require("dotenv").config();
const express = require("express");
const app = express();
const { createServer } = require("http");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const cors = require("cors");
const errorHandler = require("./app/middlewares/errorHandler");
const { Server } = require("socket.io");
const { connectDB } = require("./app/utils/connectDB");
const { createRoute } = require("./app/routes/index");
const { socketServer } = require("./socketServer");
const { createError } = require("./app/utils/createError");
const { followPostExpried } = require("./app/utils/schedule");

const env = process.env.NODE_ENV || "development";
const rootUrl = env === "development" ? "http://localhost:5000" : "http://foundandlost.vercel.app";
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.use(cookieParser());

connectDB();
createRoute(app);

const http = createServer(app);

app.all("*", (req, res, next) => {
  next(createError(404, "Không tìm thấy nguồn!"));
});

app.use(errorHandler);
const io = new Server(http, {
  cors: {
    origin: rootUrl,
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socketServer(socket);
});
cron.schedule("*/10 * * * *", () => {
  try {
    followPostExpried();
  } catch (error) {
    console.log(error);
  }
});
const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
