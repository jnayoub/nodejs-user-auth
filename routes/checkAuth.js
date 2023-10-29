const jwt = require("jsonwebtoken");

const cookieParser = require('cookie-parser');


const express = require("express");
const userRouter = express.Router();
userRouter.use(express.json());

const cors = require("cors");

userRouter.use(cookieParser());


userRouter.use(
  cors({
    origin: "*",
  })
);

userRouter.get('/check-auth', (req, res) => {
    console.log('Request Headers:', req.headers);
    console.log('Cookies:', req.cookies);
    console.log('user hit check auth v2')
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


module.exports = userRouter;