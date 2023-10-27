// Packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Routes
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");

//Config
const sequelize = require("./config/databese");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URI, // frontend URI (ReactJS)
};

// Middlewares
// -get body
app.use(express.json());
// -test middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// -Cors 
app.use(cors(corsOptions));


// Routes
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);

// Listen for requests if connections is ok
sequelize
  .sync()
  .then(async () => {
    try {
      await sequelize.authenticate();

      app.listen(process.env.PORT, () => {
        console.log("Server Is Listening ON Port: ", process.env.PORT);
      });
    } catch (error) {
      console.log(error)
    }
  })
  .catch((err) => {
    console.log(err);
  });
