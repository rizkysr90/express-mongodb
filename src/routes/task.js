const router = require("express").Router();
const controller = require("./../controllers/task");
const { body, param } = require("express-validator");
const validator = require("./../utility/express-validator");
const verifyLogin = require("./../middlewares/verifyLogin");
router.post("/", controller.createTask);
router.get(
  "/:username",
  verifyLogin,
  param("username")
    .notEmpty()
    .withMessage("masukkan parameter username")
    .bail(),
  validator,
  controller.getUserTasks
);
router.put(
  "/:username/:task_id",
  param(["username", "task_id"])
    .notEmpty()
    .withMessage("masukkan parameter username dan task id")
    .bail(),
  validator,
  controller.editUserTasks
);
router.delete(
  "/:username/:task_id",
  param(["username", "task_id"])
    .notEmpty()
    .withMessage("masukkan parameter username dan task id")
    .bail(),
  validator,
  controller.deleteUserTask
);

module.exports = router;
