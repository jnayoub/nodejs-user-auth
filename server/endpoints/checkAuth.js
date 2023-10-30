const jwt = require("jsonwebtoken");

const cookieParser = require('cookie-parser');


const express = require("express");
const userRouter = express.Router();
userRouter.use(express.json());

const cors = require("cors");

userRouter.use(cookieParser());


userRouter.use(
    cors({
      origin: "*",  // Replace with the origin of App2
      credentials: true  // This allows the server to accept cookies sent from the origin
    })
  );

userRouter.get('/', (req, res) => {
    console.log('user hit check-auth')
    let token;
    
    // Check if token is in cookies first
    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    } else {
        // If not in cookies, check the Authorization header
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader && bearerHeader.startsWith('Bearer ')) {
            token = bearerHeader.split(' ')[1];
        }
    }
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