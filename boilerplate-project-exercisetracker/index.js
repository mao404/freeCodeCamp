const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Connection
mongoose
  .connect(process.env.mongoURI)
  .then(() => console.log("Connected to DB!"));

// Schemas

const exerciseSchema = new mongoose.Schema({
  userId: String,
  username: String,
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: Date,
});

const userSchema = new mongoose.Schema({
  username: String,
});

let User = mongoose.model("User", userSchema);
let Exercise = mongoose.model("Exercise", exerciseSchema);

// Enpoints GET

app.get("/api/users", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.json({ text: "Users couldn't be accessed", error: err });
  }
});

// Endpoints POSTS

app.post("/api/users", async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
    });
    const savedUser = await newUser.save(newUser);
    res.json({ username: savedUser.username, _id: savedUser._id });
  } catch (error) {
    console.log(err);
    res.json({ text: "User not created", error: err });
  }
});

app.post("/api/users/:_id/exercises", async (req, res, next) => {
  try {
    const userId = req.params._id;
    let { description, duration, date } = req.body;

    if (!date) {
      date = date = new Date().toISOString().substring(0, 10);
    }

    //Find the user
    const user = await User.findById(userId);

    if (!user) {
      res.json({ text: "User not found" });
    }

    const newExercise = new Exercise({
      userId: user._id,
      username: user.username,
      description: description,
      duration: parseInt(duration),
      date: date,
    });

    const savedExercise = await newExercise.save(newExercise);
    res.json({
      userId: user._id,
      username: user.username,
      date: new Date(savedExercise.date).toDateString(),
      duration: savedExercise.duration,
      description: savedExercise.description,
    });
  } catch (err) {
    console.log(err);
    res.json({ text: "Exercise not created", error: err });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
