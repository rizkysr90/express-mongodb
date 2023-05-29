const AuthService = require("./../services/auth");

async function login(req, res, next) {
  try {
    const response = await AuthService.loginUser(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
};
