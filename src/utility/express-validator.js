const { validationResult } = require("express-validator");

const validator = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  const listError = errors.array();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      code: 400,
      message: listError[0]?.msg,
    });
  } else {
    next();
  }
};

module.exports = validator;
