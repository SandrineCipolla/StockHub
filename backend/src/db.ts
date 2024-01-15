//configuration et de l'établissement de la connexion à la base de données MySQL

import mysql, { Connection } from "mysql2/promise";
import dotenv from "dotenv";
import util from 'util';

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

// //const connection = mysql.createConnection(connectionOptions);
// // Exporte la fonction de création de connexion pour permettre le mocking
// export function createDatabaseConnection() {
// const connection = mysql.createConnection(connectionOptions);
//    // Ajoutez cette ligne pour vous assurer que la méthode query est disponible
//    connection.query = util.promisify(connection.query);

//  // return mysql.createConnection(connectionOptions);
//  return connection;
// }
const pool = mysql.createPool(connectionOptions);

export default pool;
// export function createDatabaseConnection(): Connection {
//   return mysql.createConnection(connectionOptions) as Connection;
// }

//export default connection;
