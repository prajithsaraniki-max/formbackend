const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/studentdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

  

// Student schema
const studentSchema = new mongoose.Schema({
  name: String,
  rollno: String,
});

const Student = mongoose.model("Student", studentSchema);

// Routes

// GET all students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// ADD student
app.post("/students", async (req, res) => {
  const { name, rollno } = req.body;
  const student = new Student({ name, rollno });
  await student.save();
  res.json(student);
});

// DELETE student
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

