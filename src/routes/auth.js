const router = require("express").Router();
const { body } = require("express-validator");
const validate = require("./../utility/express-validator");
const AuthControllers = require("./../controllers/auth");
router.post(
  "/login",
  body(["username", "password"])
    .notEmpty()
    .bail()
    .withMessage("username dan password harus diisi"),
  validate,
  AuthControllers.login
);

module.exports = router;
