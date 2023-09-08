const prisma = require("@prisma/client");

const db = new prisma.PrismaClient();

const createTask = async (req, reply) => {
  const { description, completed } = req.body;
  console.log("userId >>> ", req.userId);

  try {
    const newTask = await db.task.create({
      data: {
        description,
        completed,
        userId: req.userId,
      },
    });
    reply.send(newTask);
  } catch (error) {
    console.log("createTask Error>>>", error);
    reply.send("Something went wrong");
  }
};

const deleteTask = async (req, reply) => {
  const id = req.params.id;
  console.log("id>>", id);
  try {
    const deleteTask = await db.Task.delete({
      where: {
        id: parseInt(id),
      },
    });
    reply.send(deleteTask);
  } catch (error) {
    console.log("deleteTask Error>>>", error);
    reply.send("Something went wrong");
  }
};

const updateTask = async (req, reply) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  try {
    const updatedTask = await db.Task.update({
      where: {
        id: id,
      },
      data: {
        description: title,
      },
    });
  } catch (error) {
    console.log("updateTask Error>>>", error);
    reply.send("Something Went Wrong");
  }
};

const getTask = async (req, reply) => {
  try {
    const allTask = await db.Task.findMany({
      where: {
        userId: req.userId,
      },
    });
    reply.send(allTask);
  } catch (error) {
    console.log("getTask Error>>>", error);
    reply.send("Something Went Wrong");
  }
};

const completeTask = async (req, reply) => {
  const id = parseInt(req.params.id);
  const { completed } = req.body;
  try {
    const completedTask = await db.Task.update({
      where: {
        id: id,
      },
      data: {
        completed,
      },
    });
  } catch (error) {
    console.log("compeleteTask Error>> ", error);
    reply.send("Something Went Wrong");
  }
};

module.exports = { createTask, deleteTask, updateTask, getTask, completeTask };
