const User = require("./../models/index").UserModel;
const bcrypt = require("./../utility/bcrypt");

const create = async (req) => {
  if (req.body.password !== req.body.confirm_password) {
    let err = new Error();
    err.statusCode = 400;
    err.message = "konfirmasi password tidak sesuai";
    throw err;
  }
  // verify unique username
  const findUser = await User.findOne({ username: req.body.username }).exec();
  if (findUser) {
    console.log(findUser);
    let err = new Error();
    err.statusCode = 400;
    err.message = "username sudah digunakan";
    throw err;
  }
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
  return { code: 201, message: "berhasil menambahkan data" };
};

module.exports = {
  create,
};
