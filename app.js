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
  .catch((err) => console.log("no connection", err));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world from the express.");
});

// app.post("/students", (req, res) => {
//   const user = new Student(req.body);
//   console.log("req", req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

app.post("/students", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const createuser = await newStudent.save();
    res.status(201).send(createuser);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.status(200).send(studentsData);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(req.params);
    const studentData = await Student.findById(_id);
    if (!studentData) {
      res.status(404).send();
    } else {
      res.status(200).send(studentData);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).send();
    }
    const deletedStudent = await Student.findByIdAndDelete(_id);
    return res.status(200).send(deletedStudent);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updatedStudent);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log("listening to port 8000");
});
