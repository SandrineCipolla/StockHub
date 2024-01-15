import express, { Router } from 'express';
import * as stockController from '../controllers/stockController';

// const router = express.Router();

// // Définir les routes liées aux stocks
// router.get('/stocks', stockController.getAllStocks);

// export default router;

import { Connection } from "mysql2/promise";
import { PoolConnection } from 'mysql2/typings/mysql/lib/PoolConnection';
import pool from '../db';

const configureStockRoutes = (): Router => {
    const router = Router();
  
    router.get('/stocks', async (req, res) => {
      try {
        const connection = await pool.getConnection(); // Obtenir une connexion depuis le pool
        await stockController.getAllStocks(req, res, connection);
        connection.release(); // Libérer la connexion après utilisation
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la requête à la base de données." });
      }
    });
  
    return router;
};

export default configureStockRoutes;
