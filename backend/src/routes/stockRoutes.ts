import {Router} from "express";
import {StockController} from "../controllers/stockController";
import {connectToDatabase} from "../dbUtils";
import {ReadStockRepository} from "../repositories/readStockRepository";
import {WriteStockRepository} from "../repositories/writeStockRepository";


const configureStockRoutes = async (): Promise<Router> => {
    const router = Router();

    // création instance de stockController
    const connection = await connectToDatabase();
    const readStockRepository = new ReadStockRepository(connection);
    const writeStockRepository = new WriteStockRepository(connection);
    const stockController = new StockController(readStockRepository, writeStockRepository);

    //Route pour récupération de la liste des stocks
    router.get("/stocks", async (req, res) => {
        try {
            await stockController.getAllStocks(req, res);
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
            await stockController.getStockDetails(req, res);
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
            await stockController.getStockItems(req, res);
        } catch (error) {
            //TODO :affiner les message d'erreur ( ex: ajouter la route et le verbe utilisés pour faciliter le debug)
            console.error(`Error in route /stocks/${ID}/items:`, error);
            res.status(500).json({error: "Error while querying the database."});
        }
    });

    //Route pour créer un nouveau stock
    router.post("/stocks", async (req, res) => {
        try {
            await stockController.createStock(req, res);
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
            await stockController.updateStockItemQuantity(req, res);
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
            await stockController.addStockItem(req, res);
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
            await stockController.deleteStockItem(req, res);
        } catch (error) {
            console.error(`Error in route /stocks/${stockID}/items/${itemID}:`, error);
            res.status(500).json({error: "Error while deleting the stock item from the database."});
        }
    });

    //Route pour récupérer la liste des items
    router.get("/items", async (req, res) => {
        try {
            await stockController.getAllItems(req, res);
        } catch (error) {
            //TODO :affiner les message d'erreur ( ex: ajouter la route et le verbe utilisés pour faciliter le debug)
            console.error(`Error in route /items:`, error);
            res.status(500).json({error: "Error while querying the database for items list."});
        }
    });

    // Route pour afficher un item spécifique d'un stock
    router.get("/stocks/:stockID/items/:itemID", async (req, res) => {
        const {itemID} = req.params;
        try {
            await stockController.getItemDetails(req, res);
        } catch (error) {
            console.error(`Error in route /items/${itemID}:`, error);
            res.status(500).json({error: "Error while querying the database."});
        }
    });
    return router;
};

export default configureStockRoutes;
