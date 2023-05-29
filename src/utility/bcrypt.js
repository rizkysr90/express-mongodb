const bcrypt = require("bcrypt");
const saltRounds = 10;

const hash = async (basePassword) => {
  const hashedPassword = await bcrypt.hash(basePassword, saltRounds);
  return hashedPassword;
};

const verifyPassword = async (plain, hash) => {
  return await bcrypt.compare(plain, hash).then((result) => result);
};
module.exports = { hash, verifyPassword };
