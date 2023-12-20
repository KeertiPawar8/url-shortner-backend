const { UserModel } = require("../models/user.model");
const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const checkuser = await UserModel.find({ email });

  if (checkuser.length > 0) {
    res.send({ message: "user already exist please login" });
} else {
      console.log(username, email, password);
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if(err){
            res.send({err})
        }else{
            const user = new UserModel({ username, email, password: hash });
            await user.save();
            res.send({message:"user has been registered"});
        }
         
        
      });
    } catch (err) {
      res.send(err);
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.find({ email });

  if (user.length == 0) {
    res.send({ message: "user does not exist please signup" });
  } else {
    bcrypt.compare(password, user[0].password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userID: user[0]._id },
          process.env.JWT_SECRET
        );
        res.send({ message: "login successful",token });
      } else {
        res.send({ message: "wrong credentials" });
      }
    });
  }
});

module.exports = {
  userRouter,
};
