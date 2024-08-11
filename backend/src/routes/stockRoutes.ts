import {Router} from "express";
import * as stockController from "../controllers/stockController";
import {connectToDatabase} from "../dbUtils";
import {getItemDetails} from "../controllers/stockController";

const configureStockRoutes = (): Router => {
    const router = Router();

    //Route pour récupération de la liste des stocks
    router.get("/stocks", async (req, res) => {
        try {
            const connection = await connectToDatabase();
            await stockController.getAllStocks(req, res, connection);
            connection.release();
        } catch (error) {
            //TODO :affiner les message d'erreur ( ex: ajouter la route et le verbe utilisés pour faciliter le debug)
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
            //TODO :affiner les message d'erreur ( ex: ajouter la route et le verbe utilisés pour faciliter le debug)
            console.error(`Error in route /stocks/${ID}:`, error);
            res.status(500).json({error: "Error while querying the database."});
        }
    });

    //Route pour récupérer les items d'un stock via l'ID
    router.get("/stocks/:ID/items", async (req, res) => {
        const ID = Number(req.params.ID);
        try {
            const connection = await connectToDatabase();
            await stockController.getStockItems(req, res, connection, ID);
            connection.release();
        } catch (error) {
            //TODO :affiner les message d'erreur ( ex: ajouter la route et le verbe utilisés pour faciliter le debug)
            console.error(`Error in route /stocks/${ID}/items:`, error);
            res.status(500).json({error: "Error while querying the database."});
        }
    });

    //Route pour créer un nouveau stock
    router.post("/stocks", async (req, res) => {
        try {
            const connection = await connectToDatabase();
            await stockController.createStock(req, res, connection);
            connection.release();
        } catch (error) {
            //TODO :affiner les message d'erreur ( ex: ajouter la route et le verbe utilisés pour faciliter le debug)
            console.error("Error in route /stocks:", error);
            res.status(500).json({error: "Error while querying the database."});
        }
    });

    //Route pour mettre à jour un stock (via l'id?)
    router.put("/stocks/:stockID/items/:itemID", async (req, res) => {
        const itemID = Number(req.params.itemID);
        const {QUANTITY} = req.body;
        const stockID = Number(req.params.stockID);
        console.info('New quantity:', QUANTITY);
        try {
            const connection = await connectToDatabase();
            await stockController.updateStockItemQuantity(req, res, connection);
            connection.release();
        } catch (error) {
            //TODO :affiner les message d'erreur ( ex: ajouter la route et le verbe utilisés pour faciliter le debug)
            console.error(`Error in route /stocks/${stockID}/items/${itemID}:`, error);
            res.status(500).json({error: "Error while querying the database."});
        }
    });

    //Route pour créer un nouvel item
    router.post("/stocks/:stockID/items", async (req, res) => {
        try {
            const stockID = Number(req.params.stockID);
            const connection = await connectToDatabase();
            await stockController.addStockItem(req, res, connection, stockID);
            connection.release();
        } catch (error) {
            console.error("Error in route /stocks/:stockID/items", error);
            res.status(500).json({error: "Error in adding stock item to database(POST)."});
        }
    });

    //Route pour supprimer un item
    router.delete("/stocks/:stockID/items/:itemID", async (req, res) => {
        const itemID = Number(req.params.itemID);
        const stockID = Number(req.params.stockID);
        try {
            const connection = await connectToDatabase();
            await stockController.deleteStockItem(req, res, connection, stockID, itemID);
            connection.release();
        } catch (error) {
            console.error(`Error in route /stocks/${stockID}/items/${itemID}:`, error);
            res.status(500).json({error: "Error while deleting the stock item from the database."});
        }
    });

    //Route pour récupérer la liste des items
    router.get("/items", async (req, res) => {
        try {
            const connection = await connectToDatabase();
            await stockController.getAllItems(req, res, connection);
            connection.release();
           // res.json(items)
        } catch (error) {
            //TODO :affiner les message d'erreur ( ex: ajouter la route et le verbe utilisés pour faciliter le debug)
            console.error(`Error in route /items:`, error);
            res.status(500).json({error: "Error while querying the database for items list."});
        }
    });

    // Route pour afficher un item spécifique d'un stock
    router.get("/stocks/:stockID/items/:itemID", async (req, res) => {
        const {  itemID } = req.params;
        try {
            const connection = await connectToDatabase();
            await stockController.getItemDetails(req, res, connection, Number(itemID));
            connection.release();
        } catch (error) {
            console.error(`Error in route /items/${itemID}:`, error);
            res.status(500).json({ error: "Error while querying the database." });
        }
    });
    return router;
};

export default configureStockRoutes;
