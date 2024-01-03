import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

// Config
import sequelize from "./config/database";

// Routes
import userRoutes from './routes/userRoutes'
import workoutRoutes from './routes/workoutRoutes'

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URI, // frontend URI (ReactJS)
};


// Middlewares
// - CORS
app.use(cors(corsOptions));
// - Get Body
app.use(express.json());

// Routes
app.use('/api/users',userRoutes)
app.use('/api/workouts',workoutRoutes)

// Connection

sequelize
  .sync()
  .then(async () => {
    try {
      await sequelize.authenticate();

      app.listen(process.env.PORT, () => {
        console.log("Server Is Listening ON Port: ", process.env.PORT);
      });

    } catch (error) {
      console.log("Server Error:", error);
    }
  })
  .catch((err) => console.log("Connection Error: ", err));


