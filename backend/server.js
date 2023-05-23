require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/users");

// express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);

//connect to database & listen
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const port = process.env.PORT || 8000;
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Listening on port " + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
