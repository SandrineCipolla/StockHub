//configuration et de l'établissement de la connexion à la base de données MySQL

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3307;
const dbDatabase = process.env.DB_DATABASE;

const connectionOptions = {
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  port: dbPort,
  database: dbDatabase,
};

const pool = mysql.createPool(connectionOptions);

export default pool;
