const router = require("express").Router();
const controller = require("./../controllers/task");
const { body, param } = require("express-validator");
const validator = require("./../utility/express-validator");
const verifyLogin = require("./../middlewares/verifyLogin");
router.post("/", verifyLogin, controller.createTask);
router.get("/", verifyLogin, controller.getUserTasks);
router.put(
  "/:task_id",
  verifyLogin,
  param(["task_id"])
    .notEmpty()
    .withMessage("masukkan parameter task id")
    .bail(),
  validator,
  controller.editUserTasks
);
router.delete(
  "/:task_id",
  verifyLogin,
  param(["task_id"])
    .notEmpty()
    .withMessage("masukkan parameter task id")
    .bail(),
  validator,
  controller.deleteUserTask
);

module.exports = router;
