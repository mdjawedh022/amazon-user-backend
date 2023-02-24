const { Router } = require("express");
const jwt = require("jsonwebtoken");
const AuthRouter = Router();
const Authuser = require("../model/auth");
const bcrypt = require("bcrypt");
require("dotenv").config();

AuthRouter.post("/signup", async (req, res) => {
  const { name, email, mobile_no, password } = req.body;
  try {
    bcrypt.hash(password, 12, async (err, Secure_Password) => {
      if (err) {
        console.log(err);
      } else {
        const signupdata = new Authuser({
          name,
          email,
          mobile_no,
          password: Secure_Password,
        });
        await signupdata.save();
        res.send({ Message: "Signup successfully", signupdata: signupdata });
      }
    });
  } catch (error) {
    res.send("Error in Signup the user");
    console.log(error);
  }
});

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const logindata = await Authuser.findOne({ email });
    const hashpassword = logindata.password;
    if (logindata) {
      bcrypt.compare(password, hashpassword, (err, result) => {
        if (!err) {
          const token = jwt.sign({ user_name: logindata.name }, process.env.jwt_key, {
            expiresIn: "1d",
          });
          res.send({ token: token, user_name:logindata.name, message: "login successfully" });
        } else {
          res.send("Wrong Credntials1");
        }
      });
    } else {
      res.send("Wrong Credntials2");
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("unathorized");
  }
});

module.exports = AuthRouter;
