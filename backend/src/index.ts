import express from "express";
import cors from "cors";
import connection from "./db";
import stockRoutes from "./routes/stockRoutes";

// Créer une application Express
const app = express();
const port = process.env.PORT || 3000;

// Vérifier si la connexion à la base de données a réussi
connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connexion à la base de données établie avec succès");
});

// Utiliser CORS middleware
app.use(cors());

// Middleware pour analyser les corps de requête en JSON
app.use(express.json());

// Utiliser les routes définies dans stockRoutes.ts
app.use("/api/v1", stockRoutes);

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).send("Route non trouvée");
});

// Gestion des erreurs globales
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.error(err.stack);
  res.status(500).send('Erreur interne du serveur');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur backend en cours d'exécution sur le port ${port}`);
});

