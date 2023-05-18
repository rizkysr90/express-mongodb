const router = require("express").Router();
const controller = require("./../controllers/user");
const { body } = require("express-validator");
const validator = require("./../utility/express-validator");

router.post(
  "/",
  body(["first_name", "last_name", "username", "password", "confirm_password"])
    .notEmpty()
    .withMessage("data tidak boleh kosong")
    .bail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Minimal panjang password 8 karakter")
    .bail(),
  body("username")
    .isLength({ min: 8 })
    .withMessage("Minimal panjang username 8 karakter")
    .bail(),
  validator,
  controller.createUser
);

module.exports = router;
