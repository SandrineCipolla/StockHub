//point d'entrée principal de l'application.

import express from "express";
import cors from "cors";
//import connection from "./db";

import configureStockRoutes from "./routes/stockRoutes";
import { Connection } from "mysql2/promise";

// Créer une application Express
const app = express();
const port = process.env.PORT || 3000;

// //Méthode1
// // Vérifier si la connexion à la base de données a réussi
// connection.connect((err) => {
//   if (err) {
//     console.error("Erreur de connexion à la base de données :", err);
//     return;
//   }
//   console.log("Connexion à la base de données établie avec succès");
// });

// Remplace la connexion directe par la création de la connexion à l'aide de la fonction
//const connection = createDatabaseConnection();

let isDatabaseConnected = false;
let connection: Connection ;

// Méthode2
// export async function connectToDatabase(): Promise<void> {
//   return new Promise(async (resolve, reject) => {
//     if (isDatabaseConnected) {
//       // La connexion a déjà été établie
//       resolve();
//     } else {
//       try {
//         // Utilisez la fonction createDatabaseConnection pour établir la connexion
//         connection = await createDatabaseConnection();
//         isDatabaseConnected = true;
//         resolve();
//       } catch (error) {
//         reject(error);
//       }
//     }
//   });
// }

// export async function connectToDatabase(): Promise<void> {
//   if (!isDatabaseConnected) {
//     try {
//       // Utilisez la fonction createDatabaseConnection pour établir la connexion
//       connection = await createDatabaseConnection();
//       isDatabaseConnected = true;
//     } catch (error) {
//       console.error('Erreur de connexion à la base de données :', error);
//       throw error; // Rejeter l'erreur pour laisser le gestionnaire de promesse gérer l'échec
//     }
//   }
// }

export async function initializeApp() {
  try {
    // Utilisez la fonction connectToDatabase pour établir la connexion
    await connectToDatabase();
    isDatabaseConnected = true;
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
    process.exit(1); // Si la connexion échoue, arrêtez l'application
  }
  // Utiliser CORS middleware
app.use(cors());

// Middleware pour analyser les corps de requête en JSON
app.use(express.json());

// Utiliser les routes définies dans stockRoutes.ts
app.use("/api/v1", configureStockRoutes());

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
}

// Appel de la fonction avec async/await : fonction asynchrone qui établit la connexion à la base de données. Elle est utilisée pour éviter d'établir la connexion plusieurs fois.
if (process.env.NODE_ENV !== 'test') {
  // connectToDatabase().then(() => {
  //   console.log('Connexion à la base de données établie avec succès');
  // }).catch((err) => {
  //   console.error('Erreur de connexion à la base de données :', err);
  // });
  initializeApp();
}



// // Utiliser les routes définies dans stockRoutes.ts
// app.use("/api/v1", configureStockRoutes(connection));

// // Gestion des erreurs 404
// app.use((req, res, next) => {
//   res.status(404).send("Route non trouvée");
// });

// // Gestion des erreurs globales
// app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
//   console.error(err.stack);
//   res.status(500).send('Erreur interne du serveur');
// });

// // Démarrer le serveur
// app.listen(port, () => {
//   console.log(`Serveur backend en cours d'exécution sur le port ${port}`);
// });

export default app;

function connectToDatabase() {
    throw new Error("Function not implemented.");
  }
