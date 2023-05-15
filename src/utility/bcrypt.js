const bcrypt = require("bcrypt");
const saltRounds = 10;

const hash = async (basePassword) => {
  const hashedPassword = await bcrypt.hash(basePassword, saltRounds);
  return hashedPassword;
};

module.exports = { hash };
