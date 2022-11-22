const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const Student = require("./models/students");

const DB =
  "mongodb+srv://purangurung:JBL0RitFUSQUBJKL@cluster0.gjktvqi.mongodb.net/Studentone?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection sucessfull");
  })
  .catch((err) => console.log("no connection"));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world from the express.");
});

app.post("/students", (req, res) => {
  const user = new Student(req.body);
  console.log("req", req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(PORT, () => {
  console.log("listening to port 8000");
});
