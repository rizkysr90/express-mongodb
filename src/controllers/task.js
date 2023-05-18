const { create, getUserTasks: getAll } = require("./../services/task");

const createTask = async (req, res, next) => {
  try {
    const response = await create(req);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
const getUserTasks = async (req, res, next) => {
  try {
    const response = await getAll(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createTask,
  getUserTasks,
};
