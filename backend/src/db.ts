import mysql from 'mysql2';

// Configuration de la connexion à MySQL en utilisant dotenv
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  export default connection;