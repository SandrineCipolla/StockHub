import { Router } from 'express';
import * as stockController from '../controllers/stockController';


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
        res.status(500).json({ error: "Error while querying the database." });
      }
    });
  
    return router;
};

export default configureStockRoutes;
