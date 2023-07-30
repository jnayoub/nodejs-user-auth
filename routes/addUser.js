const db = require("../database/mongodb-connection");

const express = require("express");
const userRouter = express.Router();
userRouter.use(express.json());

const userSchema = require("../database/schemas/user-schema");

const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

userRouter.use(
  cors({
    origin: "*",
  })
);


// Creating one
userRouter.post("/", async (req, res, next) => {
  try {
    const { userName, userEmail, userPassword, userInfo, permissions } =
      req.body;
    if (!userName || !userEmail || !userPassword || !userInfo) {
      return res
        .status(400)
        .json({ message: "Invalid request format. All fields are required!" });
    }
    // Check if the userName is a string and has a length of 3 or more
    if (typeof userName !== "string" || userName.length < 3) {
      return res.status(400).json({
        message: "Username must be a string and at least 3 characters long.",
      });
    }

    // Use a regular expression to validate the email format
    let regex = /\S+@\S+\.\S+/;
    if (!regex.test(userEmail)) {
      return res.status(400).json({ message: "Email is not valid." });
    }

    // Check if the userPassword is a string and has a length of 8 or more
    if (typeof userPassword !== "string" || userPassword.length < 8) {
      return res.status(400).json({
        message: "Password must be a string and at least 8 characters long.",
      });
    }

    const existingUser = await userSchema.findOne({
      $or: [{ userName: req.body.userName }, { userEmail: req.body.userEmail }],
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(req.body.userPassword, saltRounds);
    var user = new userSchema({
      userName,
      userEmail,
      userPassword: hashedPassword,
      userInfo,
      permissions: permissions || [0], // default permissions to [0] if not provided
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
