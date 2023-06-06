const jwt = require("jsonwebtoken");
async function verifyLogin(req, res, next) {
  // get jwt token
  const extractJWT = req.get("authorization").split(" ")[1];
  if (extractJWT == null) {
    return res.status(401).json({
      meta: {
        code: 401,
        msg: "token tidak ditemukan",
      },
    });
  }
  jwt.verify(extractJWT, process.env.SECRET_AT, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(403).json({
        meta: {
          code: 403,
          msg: "unauthorized - invalid token",
        },
      });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyLogin;
