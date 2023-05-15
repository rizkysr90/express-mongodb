const User = require("./../models/index").UserModel;
const bcrypt = require("./../utility/bcrypt");

const create = async (req) => {
  const newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: await bcrypt.hash(req.body.password),
  });

  let creationUser = await newUser.save();
  if (!creationUser) {
    let err = new Error();
    err.message = "gagal menambahkan data";
    throw err;
  }
  return { message: "berhasil menambahkan data" };
};

module.exports = {
  create,
};
