const mongoose = require("mongoose");
const userModel = require("./user");

const db = {};

db.mongoose = mongoose;
db.UserModel = userModel(mongoose);
module.exports = db;
