require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// Middleware
app.use(express.json());

//routes
app.use("/api/workouts", workoutRoutes);

//connect to database & listen
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Listening on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
