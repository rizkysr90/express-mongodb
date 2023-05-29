require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DB = require("./src/models/index");
const app = express();
const port = process.env.PORT;
const morgan = require("morgan");
const userRouter = require("./src/routes/user");
const taskRouter = require("./src/routes/task");
const authRouter = require("./src/routes/auth");
// Connect to the database
DB.mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to the database");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.get("/tes", async (req, res, next) => {
//   const Rizki = new DB.UserModel({
//     first_name: "Rizki",
//     last_name: "Ramadhan",
//     username: "rizkysr90",
//     password: await bcrypt.hash(process.env.ADMIN_PASSWORD),
//   });
//   Rizki.introduce();
//   await Rizki.save();
//   res.status(200).json({
//     msg: "sukses",
//   });
// });
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

app.listen(port, () => {
  console.log("Server is running");
});
