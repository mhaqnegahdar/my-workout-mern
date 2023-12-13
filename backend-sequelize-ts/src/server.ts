import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";

// Routes
import userRoutes from './routes/userRoutes'
import workoutRoutes from './routes/workoutRoutes'

const corsOptions = {
  origin: process.env.FRONTEND_URI, // frontend URI (ReactJS)
};

const app = express();

// Middlewares
// - CORS
app.use(cors(corsOptions));
// - Get Body
app.use(express.json());
// - Body Parser
app.use(bodyParser.json());
// - Cookie Parser
app.use(cookieParser());
// - Compress
app.use(compression());

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


