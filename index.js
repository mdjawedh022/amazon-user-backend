const express = require("express");
const app = express();
const connection = require("./db/database")
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Amazon Authication....");
});

app.listen(process.env.PORT, async() => {
    await connection
    console.log("Database connect to server");
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
