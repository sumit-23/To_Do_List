const { signup, login } = require("../controllers/userController");

async function userRoutes(fastify, options) {
  fastify.post("/signup", signup);

  fastify.post("/login", login);
}

module.exports = userRoutes;
