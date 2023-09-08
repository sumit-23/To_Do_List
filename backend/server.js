const fastify = require("fastify");
const cors = require("@fastify/cors");
const server = fastify();

server.register(cors, {
  origin: true,
});

const userRoutes = require("./routes/userRouter");
const taskRoutes = require("./routes/taskRouter");

server.register(userRoutes);
server.register(taskRoutes);

server.listen({ port: 4000 }, (err, address) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is running on", address);
  }
});
