//point d'entrée principal de l'application.

import express from "express";
import cors from "cors";
import pool from "./db";

import configureStockRoutes from "./routes/stockRoutes";
import { Connection } from "mysql2/promise";

const app = express();
const port = process.env.PORT || 3000;

let isDatabaseConnected = false;
let connection: Connection;

export async function connectToDatabase(): Promise<void> {
  if (!isDatabaseConnected) {
    try {
      connection = await pool.getConnection();
      isDatabaseConnected = true;
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error; // Rejet de l'erreur pour laisser le gestionnaire de promesse gérer l'échec
    }
  }
}

export async function initializeApp() {
  try {
    // Établir la connexion avec connectToDatabase
    await connectToDatabase();
    isDatabaseConnected = true;
  } catch (error) {
    console.error("Error connecting to the database :", error);
    process.exit(1); // Si la connexion échoue, arrêtez l'application
  }

  // Utilisation CORS middleware
  app.use(cors());

  // Middleware pour analyser les corps de requête en JSON
  app.use(express.json());

  // Utilisation des routes définies dans stockRoutes.ts
  app.use("/api/v1",configureStockRoutes());

  // Gestion des erreurs 404
  app.use((req, res, next) => {
    res.status(404).send("Route not found");
  });

  // Gestion des erreurs globales
  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): void => {
      console.error(err.stack);
      res.status(500).send("Internal Server Error");
    }
  );

  // Démarrer le serveur
  app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
  });
}

if (process.env.NODE_ENV !== "test") {
  initializeApp();
}

export default app;
