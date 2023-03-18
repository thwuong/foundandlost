require("dotenv").config();
const express = require("express");
const app = express();
const { createServer } = require("http");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const errorHandler = require("./app/middlewares/errorHandler");
const { createError } = require("./app/utils/createError");
const { connectDB } = require("./app/utils/connectDB");
const { createRoute } = require("./app/routes/index");
const { socketServer } = require("./socketServer");
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
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socketServer(socket);
});

const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
