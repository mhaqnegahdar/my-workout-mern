import { ConnectOptions } from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";
const MONGO_USER = process.env.MONGO_USER || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_DATABASE = process.env.MONGO_DATABASE || "";
const MONGO_OPTIONS: ConnectOptions = {
  retryWrites: true,
  w: "majority",
  appName: "MohamadHaqnegahdar",
};
const MONGO_CONNECTION = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URI}.mongodb.net/${MONGO_DATABASE}`;

export const DB = {
  MONGO_URI,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DATABASE,
  MONGO_OPTIONS,
  MONGO_CONNECTION,
};
