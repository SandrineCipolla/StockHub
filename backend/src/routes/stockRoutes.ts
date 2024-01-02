import express from 'express';
import * as stockController from '../controllers/stockController';

const router = express.Router();

// Définir les routes liées aux stocks
router.get('/stocks', stockController.getAllStocks);

export default router;
