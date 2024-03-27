//Etablir la connexion à la base de données MySQL

import mysql, {PoolConnection} from "mysql2/promise";
import dotenv from "dotenv";
import {connectionOptions} from "./configurationDb";


const pool = mysql.createPool(connectionOptions);

export default pool;

export async function connectToDatabase(): Promise<PoolConnection> {
    try {
        const connection = await pool.getConnection();
        console.info("Connection to database successful");
        return connection;
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
}