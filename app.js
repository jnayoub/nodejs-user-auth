const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
  
const dotenv = require("dotenv");
dotenv.config();

const addUserRouter = require("./routes/addUser");
const getUserRouter = require("./routes/getUser");
const checkAuthRouter = require("./routes/checkAuth");

app.use("/addUser", addUserRouter);
app.use("/getUser", getUserRouter);
app.use("/checkAuth", checkAuthRouter);

app.use('/testpage', express.static('client', {index: 'index.html'}));

app.listen(process.env.PORT, () => {
  console.log("Server started on port 3000");
});
