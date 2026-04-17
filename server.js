const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

//  Serve frontend
app.use(express.static("public"));

//  MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/teztecchDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

//  Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Model
const User = mongoose.model("User", userSchema);

// API route
app.get("/data", (req, res) => {
  res.json({ message: "Backend connected successfully 🚀" });
});

//  Add user (test)
app.get("/add", async (req, res) => {
  try {
    const user = new User({
      name: "Harshada",
      email: "harshada@gmail.com"
    });

    await user.save();
    res.send("User saved to MongoDB ✅");

  } catch (err) {
    res.status(500).send(err);
  }
});

//  Show website
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//  Start server (ONLY ONCE)
app.listen(5000, () => {
  console.log("Server started on port 5000");
});