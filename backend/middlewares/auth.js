const jwt = require("jsonwebtoken");
const SECRET_KEY = "TASKAPI";
const auth = (req, reply, next) => {
  try {
    let token = req.headers.authorization;
    console.log("auth", token);
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);

      req.userId = user.id;
      console.log(user);
    } else {
      console.log("Auth Error>>> ", error);
      return reply.status(401).send({ message: "Unauthorized User" });
    }
    console.log("token get");
    next();
  } catch (error) {
    console.log("My Auth Error>>> ", error);
    reply.status(401).send({ message: "Unauthorized User" });
  }
};

module.exports = auth;
