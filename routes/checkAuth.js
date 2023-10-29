const jwt = require("jsonwebtoken");

const express = require("express");
const authRouter = express.Router();
authRouter.use(express.json());

const cors = require("cors");

authRouter.use(
  cors({
    origin: "*",
  })
);

authRouter.get('/check-auth', (req, res) => {
    console.log('user hit check auth')
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