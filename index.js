const express = require("express");
const app = express();
const connection = require("./db/database");
const AuthRouter = require("./router/Authuser");
const cors = require("cors");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Amazon Authication....");
});

app.use("/auth", AuthRouter);

app.listen(process.env.PORT, async () => {
  await connection;
  console.log("Database connect to server");
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
