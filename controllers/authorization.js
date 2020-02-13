const jwt = require("jsonwebtoken");
const secret = require("../secret");

module.exports = {
  authorization_check: (req, res, next) => {
    if (!req.headers.authorization)
      return res
        .status(401)
        .json({ error: "authorization failure" })
        .end();

    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret);
      next();
    } catch (error) {
      console.log(error);
      res
        .status(401)
        .end()
        .json({ error: "authorization failur" });
    }
  }
};
