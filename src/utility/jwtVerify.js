async function validateToken(token, secret) {
  try {
    const result = jwt.verify(token, secret);

    return {
      name: result.name,
      role: result.role,
    };
  } catch (ex) {
    return null;
  }
}

module.exports = validateToken;
