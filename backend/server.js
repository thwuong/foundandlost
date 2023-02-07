require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./app/middlewares/errorHandler");
const { connectDB } = require("./app/utils/connectDB");
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDB();
// Routes
app.use("/api/auth", require("./app/routes/authRouter"));

app.all("*", (req, res, next) => {
  const err = new Error("Resource not Found");
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
