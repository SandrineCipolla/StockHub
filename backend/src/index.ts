import express from "express";
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

// Utiliser les routes définies dans stockRoutes.ts
app.use("/api/v1", stockRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur backend en cours d'exécution sur le port ${port}`);
});
