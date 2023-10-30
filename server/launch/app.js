const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const protocol = process.env.PROTOCOL || 'http';

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
  
const dotenv = require("dotenv");
dotenv.config();

// Use the routers
const apiRouter = require("../routers/authRouter");
const clientRouter = require("../routers/clientRouter");

app.use("/api", apiRouter);   // Prefix the API routes with /api for clarity, optional
app.use(clientRouter);        // Client routes don't need a prefix, they're static files

app.listen(port, () => {
  console.log(`Server started on ${protocol}://${host}:${port}`);
});
