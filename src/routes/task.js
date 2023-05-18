const router = require("express").Router();
const controller = require("./../controllers/task");
const { body } = require("express-validator");
const validator = require("./../utility/express-validator");

router.post("/", controller.createTask);
router.get("/:username", controller.getUserTasks);
module.exports = router;
