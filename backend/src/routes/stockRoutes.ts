import {Router} from "express";
import {StockController} from "../controllers/stockController";
import {connectToDatabase} from "../dbUtils";
import {ReadStockRepository} from "../repositories/readStockRepository";
import {WriteStockRepository} from "../repositories/writeStockRepository";
import {HTTP_CODE_INTERNAL_SERVER_ERROR} from "../Utils/httpCodes";
import {ReadUserRepository} from "../services/readUserRepository";
import { WriteUserRepository } from "../services/writeUserRepository";


const configureStockRoutes = async (): Promise<Router> => {
    const router = Router({ mergeParams: true });

    // création instance de stockController
    const connection = await connectToDatabase();
    const readStockRepository = new ReadStockRepository(connection);
    const writeStockRepository = new WriteStockRepository(connection);
    const readUser = new ReadUserRepository(connection);
    const writeUser = new WriteUserRepository(connection);
    const stockController = new StockController(readStockRepository, writeStockRepository,readUser,writeUser);


    //Route pour récupération de la liste des stocks
    router.get("/stocks", async (req, res) => {
        try {
            await stockController.getAllStocks(req, res);
        } catch (error) {
            console.error("Error in GET /stocks:", error);
            res.status(HTTP_CODE_INTERNAL_SERVER_ERROR).json({error: "Error while querying the database."});
        }
    });

    //Route pour récupérer le détail d'un stock via l'ID
    router.get("/stocks/:ID", async (req, res) => {
        const ID = Number(req.params.ID);
        try {
            await stockController.getStockDetails(req, res);
        } catch (error) {
            console.error(`Error in GET /stocks/${ID}:`, error);
            res.status(HTTP_CODE_INTERNAL_SERVER_ERROR).json({error: "Error while querying the database."});
        }
    });

    //Route pour récupérer les items d'un stock via l'ID
    router.get("/stocks/:ID/items", async (req, res) => {
        const ID = Number(req.params.ID);
        try {
            await stockController.getStockItems(req, res);
        } catch (error) {
            console.error(`Error in GET /stocks/${ID}/items:`, error);
            res.status(HTTP_CODE_INTERNAL_SERVER_ERROR).json({error: "Error while querying the database."});
        }
    });

    //Route pour créer un nouveau stock
    router.post("/stocks", async (req, res) => {
        try {
            await stockController.createStock(req, res);
        } catch (error) {
            console.error("Error in POST /stocks:", error);
            res.status(HTTP_CODE_INTERNAL_SERVER_ERROR).json({error: "Error while querying the database."});
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
            console.error(`Error in PUT /stocks/${stockID}/items/${itemID}:`, error);
            res.status(HTTP_CODE_INTERNAL_SERVER_ERROR).json({error: "Error while querying the database."});
        }
    });

    //Route pour créer un nouvel item
    router.post("/stocks/:stockID/items", async (req, res) => {
        try {
            const stockID = Number(req.params.stockID);
            await stockController.addStockItem(req, res);
        } catch (error) {
            console.error("Error in POST /stocks/:stockID/items", error);
            res.status(HTTP_CODE_INTERNAL_SERVER_ERROR).json({error: "Error in adding stock item to database(POST)."});
        }
    });

    //Route pour supprimer un item
    router.delete("/stocks/:stockID/items/:itemID", async (req, res) => {
        const itemID = Number(req.params.itemID);
        const stockID = Number(req.params.stockID);
        try {
            await stockController.deleteStockItem(req, res);
        } catch (error) {
            console.error(`Error in DELETE /stocks/${stockID}/items/${itemID}:`, error);
            res.status(HTTP_CODE_INTERNAL_SERVER_ERROR).json({error: "Error while deleting the stock item from the database."});
        }
    });

    //Route pour récupérer la liste des items
    router.get("/items", async (req, res) => {
        try {
            await stockController.getAllItems(req, res);
        } catch (error) {
            console.error(`Error in GET /items:`, error);
            res.status(HTTP_CODE_INTERNAL_SERVER_ERROR).json({error: "Error while querying the database for items list."});
        }
    });

    // Route pour afficher un item spécifique d'un stock
    router.get("/stocks/:stockID/items/:itemID", async (req, res) => {
        const {itemID} = req.params;
        try {
            await stockController.getItemDetails(req, res);
        } catch (error) {
            console.error(`Error in GET /items/${itemID}:`, error);
            res.status(HTTP_CODE_INTERNAL_SERVER_ERROR).json({error: "Error while querying the database."});
        }
    });
    return router;
};

export default configureStockRoutes;
