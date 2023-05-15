const { create } = require("./../services/user");

const createUser = async (req, res, next) => {
  try {
    const response = await create(req);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
};
