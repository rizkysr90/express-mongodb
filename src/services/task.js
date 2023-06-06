const Task = require("./../models/index").TaskModel;
const User = require("./../models/index").UserModel;
const create = async (req) => {
  const newTask = new Task({
    title: req.body.title,
    details: req.body.details,
    date: req.body.date ? req.body.date : new Date(),
  });
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
  const foundTasks = await Task.find({ username: req.user.username }).exec();
  return {
    code: 200,
    data: foundTasks,
  };
};

const editTask = async (req) => {
  const foundUser = await User.findOne({
    username: req.params.username,
  }).exec();
  if (!foundUser) {
    let err = new Error();
    err.statusCode = 401;
    err.message = "unauthorized";
    throw err;
  }
  const foundTask = await Task.findOne({
    _id: req.params.task_id,
  }).exec();
  if (!foundTask) {
    let err = new Error();
    err.statusCode = 404;
    err.message = "task not found";
    throw err;
  }

  const res = await Task.updateOne(
    {
      _id: req.params.task_id,
    },
    {
      title: req.body?.title ? req.body?.title : foundTask.title,
      details: req.body?.details ? req.body?.details : foundTask.details,
      date: req.body?.date ? req.body?.date : foundTask.date,
      is_done: req.body?.is_done ? req.body?.is_done : foundTask.is_done,
    }
  );
  return {
    code: 200,
    data: res.upsertedId,
  };
};

const deleteTask = async (req) => {
  const foundUser = await User.findOne({
    username: req.params.username,
  }).exec();
  if (!foundUser) {
    let err = new Error();
    err.statusCode = 401;
    err.message = "unauthorized";
    throw err;
  }
  const foundTask = await Task.findOne({
    _id: req.params.task_id,
  }).exec();
  if (!foundTask) {
    let err = new Error();
    err.statusCode = 404;
    err.message = "task not found";
    throw err;
  }
  await Task.deleteOne({
    _id: req.params.task_id,
  });
  return {
    code: 200,
    data: null,
  };
};
module.exports = {
  create,
  getUserTasks,
  editTask,
  deleteTask,
};
