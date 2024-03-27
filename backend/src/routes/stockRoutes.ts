import {Router} from "express";
import * as stockController from "../controllers/stockController";
import {connectToDatabase} from "../dbUtils";

const configureStockRoutes = (): Router => {
    const router = Router();

    router.get("/stocks", async (req, res) => {
        try {
            const connection = await connectToDatabase();
            await stockController.getAllStocks(req, res, connection);
            connection.release(); // Libérer la connexion après utilisation
        } catch (error) {
            console.error("Error in route /stocks:", error);
            res.status(500).json({error: "Error while querying the database."});
        }
    });

    return router;
};

export default configureStockRoutes;
