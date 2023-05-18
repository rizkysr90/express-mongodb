const mongoose = require("mongoose");
const userModel = require("./user");
const taskModel = require("./task");
const db = {};

db.mongoose = mongoose;
db.UserModel = userModel(mongoose);
db.TaskModel = taskModel(mongoose);

module.exports = db;
