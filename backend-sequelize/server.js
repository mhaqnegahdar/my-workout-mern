// Packages
require("dotenv").config();
const express = require("express");
// Routes
const workoutRoutes = require("./routes/workoutRoutes");

//Config
const sequelize = require("./config/databese");

const app = express();

// Middlewares
// -get body
app.use(express.json());
// -test middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

// Listen for requests if connections is ok
sequelize
  .authenticate()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server Is Listening ON Port: ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
