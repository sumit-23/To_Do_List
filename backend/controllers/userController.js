const prisma = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = new prisma.PrismaClient();

const SECRET_KEY = "TASKAPI";

const signup = async (req, reply) => {
  // User existing check
  // Hashed Password
  // User Creation
  // Token Generation

  const { name, email, password } = req.body;
  try {
    const existingUser = await db.User.findUnique({ where: { email } });

    if (existingUser) {
      return reply.status(400).send({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.User.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ email: result.email, id: result.id }, SECRET_KEY);
    console.log(result.id);

    reply.send({ user: result, token: token });
  } catch (error) {
    console.log("Signup Error>>>", error);
    reply.status(500).send({ message: "Something went wrong" });
  }
};

const login = async (req, reply) => {
  const { email, password } = req.body;
  try {
    const existingUser = await db.User.findUnique({ where: { email } });

    if (!existingUser) {
      return reply.status(404).send({ message: "User not found" });
    }
    console.log("existing user>>>>", existingUser);

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return reply.status(400).send({ message: "Invalid Credential" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      SECRET_KEY
    );
    reply.send({ user: existingUser, token: token });
  } catch (error) {
    console.log("Login Error>>>>", error);
    reply.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { login, signup };
