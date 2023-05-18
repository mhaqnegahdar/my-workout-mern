require("dotenv").config();
const express = require("express");

const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// Middleware
app.use(express.json());

//routes
app.use("/api/workouts", workoutRoutes);

//listen
app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
