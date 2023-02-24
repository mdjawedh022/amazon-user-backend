const { Router } = require("express");
const jwt = require("jsonwebtoken");
const AuthRouter = Router();
const Authuser = require("../model/auth");
const bcrypt = require("bcrypt");
require("dotenv").config();

AuthRouter.post("/signup", async (req, res) => {
  const { name, email, mobile_no, password } = req.body;
  if (!name || !email || !mobile_no || !password) {
    return res.status(403).send("requried field not found");
  }
  const isEmailExist = await Authuser.findOne({ email });
  if (isEmailExist) {
    return res.status(403).send("email already exist");
  }
  try {
    bcrypt.hash(password, 12, async (err, Secure_Password) => {
      if (err) {
        res.status(500).send("Internal server error", err.message);
      }
      const signupdata = new Authuser({
        name,
        email,
        mobile_no,
        password: Secure_Password,
      });

      signupdata.save((err, _result) => {
        if (err) {
          return res.status(500).send("Something went wrong");
        }
        return res.status(200).send("signup sucessful");
      });
    });
  } catch (error) {
    res.status(500).send("Error in Signup the user", error.message);
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
          const token = jwt.sign(
            { user_name: logindata.name },
            process.env.jwt_key,
            {
              expiresIn: "1d",
            }
          );
          res.send({
            token: token,
            user_name: logindata.name,
            message: "login successfully",
          });
        } else {
          res.status(401).send("Wrong Credntials1");
        }
      });
    } else {
      res.status(401).send("Wrong Credntials2");
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("unathorized");
  }
});

module.exports = AuthRouter;
