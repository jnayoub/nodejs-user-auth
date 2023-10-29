const jwt = require("jsonwebtoken");
const db = require("../database/mongodb-connection");

const express = require("express");
const authRouter = express.Router();
authRouter.use(express.json());

const userSchema = require("../database/schemas/user-schema");

const cors = require("cors");

const bcrypt = require("bcrypt");

authRouter.use(
  cors({
    origin: "*",
  })
);

userRouter.get('/check-auth', (req, res) => {
    const token = req.cookies.jwt;  // Assuming the cookie's name is "jwt"

    if (!token) {
        return res.status(401).json({ message: "No token found." });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return res.json({ token, message: "Token is valid." });
    } catch (err) {
        return res.status(401).json({ message: "Invalid token." });
    }
});


module.exports = authRouter;