import {Request, Response} from "express";
import {PoolConnection} from "mysql2/promise";
import {StockService} from "../services/stockService";
import {extractDataFromRequestBody} from "../Utils/requestUtils";
import {StockToCreate, UpdateStockRequest} from "../models";
import {ValidationError} from "../errors";

export const getAllStocks = async (req: Request, res: Response, connection: PoolConnection) => {
    try {
        const stockService = new StockService(connection);
        const stocks = await stockService.getAllStocks();
        res.status(200).json(stocks);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
};

export const createStock = async (req: Request, res: Response, connection: PoolConnection) => {
    try {
        const stock: Partial<StockToCreate> = extractDataFromRequestBody(req, ['LABEL', 'DESCRIPTION']);
        const stockService = new StockService(connection);
        await stockService.createStock( stock);
        res.json({message: "Stock created successfully."});
    } catch (err: any) {
        console.error(err);
        res.json({error: err.message});
    }
};

export const getStockDetails = async (req: Request, res: Response, connection: PoolConnection, ID: number) => {
    try {
        const stockService = new StockService(connection);
        const stock = await stockService.getStockDetails(ID);
        res.json(stock);
    } catch (err: any) {
        console.error(err);
        res.json({error: err.message});
    }
};

export const getStockItems = async (req: Request, res: Response, connection: PoolConnection, ID: number) => {
    try {
        const stockService = new StockService(connection);
        const items = await stockService.getStockItems(ID);
        res.json(items);
    } catch (err: any) {
        console.error(err);
        res.json({error: err.message});
    }
};

export const updateStockItemQuantity = async (req: Request, res: Response, connection: PoolConnection) => {
    try {
        const itemID = Number(req.params.itemID);
        const {QUANTITY} = req.body;
        const stockID = Number(req.params.stockID);

        const updatedItemQuantity = {id: itemID, quantity: QUANTITY};
        if (updatedItemQuantity.id === undefined || updatedItemQuantity.quantity === undefined) {
            res.status(400).json({error: 'ID and QUANTITY must be provided.'});
            return;
        }
        const stockService = new StockService(connection);
        const updateRequest = new UpdateStockRequest(updatedItemQuantity.id, updatedItemQuantity.quantity, stockID);
        await stockService.updateStockItemQuantity(updateRequest);
        res.json({message: "Stock updated successfully."});
    } catch (err: any) {
        console.error('Error in updateStockItemQuantity:', err);
        res.status(500).json({error: 'Error while updating the database.'});
    }
};

export const addStockItem = async (req: Request, res: Response, connection: PoolConnection, stockID: number) => {
    try {
        const itemUpdated = {
            id: undefined,
            label: req.body['LABEL'],
            description: req.body['DESCRIPTION'],
            quantity: req.body['QUANTITY']
        };
        const stockService = new StockService(connection);
        await stockService.addStockItem(itemUpdated, stockID);
        res.status(201).json({message: "Stock item added successfully."});
    } catch (err: any) {
        console.error('Error in addStockItem:', err);
        if (err instanceof ValidationError) {
            res.status(400).json({error: err.message, data: err.data});
        } else {
            res.status(500).json({error: 'Error while updating the database.'});
        }
    }
};

export const deleteStockItem = async (req: Request, res: Response, connection: PoolConnection, stockID: number, itemID: number) => {
    try {
        const {ITEM} = req.body;
        if (ITEM !== itemID) {
            return res.status(400).json({error: "Item ID in the body does not match item ID in the URL"});
        }
        const stockService = new StockService(connection);
        const result = await stockService.deleteStockItem(stockID, itemID);
        if (result.affectedRows === 0) {
            return res.status(404).json({error: "Item not found or already deleted"});
        }
        res.status(200).json({message: "Stock item deleted successfully."});
    } catch (err: any) {
        console.error(`Error in deleteStockItem:`, err);
        res.status(500).json({error: "Error while deleting the stock item from the database."});
    }
};

export const getAllItems = async (req: Request, res: Response, connection: PoolConnection) => {
    try {
        const stockService = new StockService(connection);
        const items = await stockService.getAllItems();
        res.status(200).json(items);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
};

export const getItemDetails = async (req: Request, res: Response, connection: PoolConnection, itemID: number) => {
    try {
        const stockService = new StockService(connection);
        const items = await stockService.getItemDetails(itemID);
        if (items.length > 0) {
            res.json(items[0]);
        } else {
            res.status(404).json({error: "Item not found."});
        }
    } catch (error) {
        console.error(`Error in getItemDetails:`, error);
        res.status(500).json({error: "Error while querying the database."});
    }
};