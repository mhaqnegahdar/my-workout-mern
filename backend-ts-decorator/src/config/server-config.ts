import dotenv from 'dotenv';

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';


export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAE;
export const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 8000;

export const SERVER = {
  SERVER_HOSTNAME,
  SERVER_PORT,
};
