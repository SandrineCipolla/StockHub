import {Router} from "express";
import * as stockController from "../controllers/stockController";
import {connectToDatabase} from "../dbUtils";

const configureStockRoutes = (): Router => {
    const router = Router();

    //Route pour récupération de la liste des stocks
    router.get("/stocks", async (req, res) => {
        try {

            const connection = await connectToDatabase();
            await stockController.getAllStocks(req, res, connection);
            connection.release();
        } catch (error) {
            console.error("Error in route /stocks:", error);
            res.status(500).json({error: "Error while querying the database."});
        }
    });

    //Route pour récupérer le détail d'un stock via l'ID
    router.get("/stocks/:ID", async (req, res) => {
        const ID = Number(req.params.ID);
        console.log('ID extracted from URL:', ID);
        try {
            const connection = await connectToDatabase();
            await stockController.getStockDetails(req, res, connection, ID);
            console.log('ID received in controller:', ID);

            connection.release();
        } catch (error) {
            console.error(`Error in route /stocks/${ID}:`, error);
            res.status(500).json({error: "Error while querying the database."});
        }
    });

    //Route pour créer un nouveau stock
    router.post("/stocks", async (req, res) => {
        try {
            const {id, label, description, quantity} = req.body;
            const connection = await connectToDatabase();
            await stockController.createStock(req, res, connection, {id, label, description, quantity});
            connection.release();
        } catch (error) {
            console.error("Error in route /stocks:", error);
            res.status(500).json({error: "Error while querying the database."});
        }
    });
  
    return router;
};

export default configureStockRoutes;
