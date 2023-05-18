const Task = require("./../models/index").TaskModel;
const User = require("./../models/index").UserModel;
const create = async (req) => {
  const newTask = new Task({
    title: req.body.title,
    details: req.body.details,
    date: req.body.date ? req.body.date : new Date(),
    username: req.body.username,
  });
  // verify unique username
  const findUser = await User.findOne({
    username: req.body.username,
  }).exec();
  if (!findUser) {
    let err = new Error();
    err.statusCode = 401;
    err.message = "unauthorized";
    throw err;
  }
  let creationTask = await newTask.save();
  if (!creationTask) {
    let err = new Error();
    err.message = "gagal menambahkan data";
    throw err;
  }
  return {
    code: 201,
    message: "berhasil menambahkan data",
  };
};
const getUserTasks = async (req) => {
  const foundUser = await User.findOne({
    username: req.params.username,
  }).exec();
  if (!foundUser) {
    let err = new Error();
    err.statusCode = 401;
    err.message = "unauthorized";
    throw err;
  }
  const foundTasks = await Task.find({ username: req.params.username }).exec();
  return {
    code: 200,
    data: foundTasks,
  };
};

module.exports = {
  create,
  getUserTasks,
};
