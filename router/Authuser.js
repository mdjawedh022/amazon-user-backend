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

AuthRouter.post("/lognin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const logindata = await Authuser.find({ email });
    const hashpassword = logindata[0].password;
    if (logindata.length > 0) {
      bcrypt.compare(password, hashpassword, (err, result) => {
        if (!err) {
          const token = jwt.sign(
            { userID: logindata[0]._id },
            process.env.jwt_key,
            {
              expiresIn: "1d",
            }
          );
          res.send({ token: token, message: "login successfully" });
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
