const {
  getTask,
  createTask,
  deleteTask,
  updateTask,
  completeTask,
} = require("../controllers/taskControllers");
const auth = require("../middlewares/auth");

async function taskRoutes(fastify) {
  fastify.get("/getTask", { preHandler: auth }, getTask);

  fastify.post("/createTask", { preHandler: auth }, createTask);

  fastify.delete("/deleteTask/:id", { preHandler: auth }, deleteTask);

  fastify.put("/updateTask/:id", { preHandler: auth }, updateTask);

  fastify.put("/compeleteTask/:id", { preHandler: auth }, completeTask);
}

module.exports = taskRoutes;
