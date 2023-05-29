const jwt = require("jsonwebtoken");
const User = require("./../models/index").UserModel;
const { verifyPassword } = require("./../utility/bcrypt");
const validateToken = require("./../utility/jwtVerify");

async function loginUser(req) {
  const { username: USERNAME, password: PASSWORD } = req.body;
  //   find user in the database
  let findUser = await User.findOne({
    username: USERNAME,
  }).exec();

  if (!findUser) {
    let err = new Error();
    err.statusCode = 404;
    err.message = "account not found";
    throw err;
  }
  //   verify password
  if (!(await verifyPassword(PASSWORD, findUser.password))) {
    let err = new Error();
    err.statusCode = 400;
    err.message = "email or password are wrong";
    throw err;
  }
  const payload = {
    id: findUser?.id,
    username: findUser?.username,
  };
  // set access token and the expired time is 10 minuts
  const access_token = jwt.sign(payload, process.env.SECRET_AT, {
    expiresIn: 600,
  });
  const refresh_token = jwt.sign(payload, process.env.SECRET_RT, {
    expiresIn: "1 days",
  });
  return {
    code: 200,
    meta: {
      msg: "berhasil login",
    },
    data: {
      access_token,
      refresh_token,
    },
  };
}
async function refreshToken(req) {
  const token = req.body.refreshToken;
  const user = validateToken(token, process.env.SECRET_RT);
  if (user === null) {
    let err = new Error();
    err.statusCode = 403;
    err.message = "invalid token";
    throw err;
  }
  //now that we know the refresh token is valid
  //lets take an extra hit the database
  const result = await User.findOne({
    refresh_token: token,
  }).exec();
  if (!result) {
    let err = new Error();
    err.statusCode = 403;
    err.message = "invalid token";
    throw err;
  }
  const payload = {
    id: user?.id,
    username: user?.username,
  };
  // set access token and the expired time is 10 minuts
  const access_token = jwt.sign(payload, process.env.SECRET_AT, {
    expiresIn: 600,
  });
  return {
    access_token,
  };
}

module.exports = {
  loginUser,
};
