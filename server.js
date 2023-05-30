const express = require("express");
const cors = require("cors");
const DB = require("./src/models/index");
const app = express();
const morgan = require("morgan");
const userRouter = require("./src/routes/user");
const taskRouter = require("./src/routes/task");
const authRouter = require("./src/routes/auth");
// Connect to the database

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/auth", authRouter);
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode ? err.statusCode : 500;
  err.message = err.message ? err.message : "Internal Server Error";
  console.error(err.stack);
  res.status(err.statusCode).json({
    code: err.statusCode,
    message: err.message,
  });
});

module.exports = app;
