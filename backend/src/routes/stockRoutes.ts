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
        try {
            const connection = await connectToDatabase();
            await stockController.getStockDetails(req, res, connection, ID);

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
    //Route pour mettre à jour un stock (via l'id?)
    router.put("/stocks/:ID", async (req, res) => {
        const ID = Number(req.params.ID);
        const {QUANTITY} = req.body;
        console.info('New quantity:', QUANTITY);
        try {
            const connection = await connectToDatabase();
            await stockController.updateStockQuantity(req, res, connection, ID, QUANTITY);
            connection.release();
        } catch (error) {
            console.error(`Error in route /stocks/${ID}:`, error);
            res.status(500).json({error: "Error while querying the database."});
        }
    });

    return router;
};

export default configureStockRoutes;
