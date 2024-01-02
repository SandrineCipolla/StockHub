require("dotenv").config();
import express, { Request, Response } from "express";
import mysql from "mysql2";

// Créer une application Express
const app = express();
const port = process.env.PORT || 3000;

// Configuration de la connexion à MySQL en utilisant dotenv
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Vérifier si la connexion à la base de données a réussi
connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connexion à la base de données établie avec succès");
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur backend en cours d'exécution sur le port ${port}`);
});
