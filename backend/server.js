require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./app/middlewares/errorHandler");
const { createError } = require("./app/utils/createError");
const { connectDB } = require("./app/utils/connectDB");
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDB();
// Routes
app.use("/api/user", require("./app/routes/userRouter"));

app.all("*", (req, res, next) => {
  next(createError(404, "Resource not Found"));
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
