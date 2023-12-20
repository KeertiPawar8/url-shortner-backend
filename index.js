const express = require("express"); 
require("dotenv").config();
const { connection } = require("./db/db");
const {userRouter} = require("./controllers/user.routes");
const {shorturlRouter} = require("./controllers/shorturl.routes")
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.port || 7000;

app.get("/", (req, res) => {
    res.send("HOME PAGE");
  });
app.use("/",userRouter)
app.use("/",shorturlRouter)


app.listen(port, async () => {
  try {
    await connection;
    console.log(`server is running at port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
