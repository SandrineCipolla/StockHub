import {Request, Response} from "express";
import {PoolConnection} from "mysql2/promise";
import {StockService} from "../services/stockService";
import {UpdateStockRequest} from "../models";
import {BadRequestError, ErrorMessages, NotFoundError, sendError, ValidationError} from "../errors";


//TODO voir le warn des throw
//TODO voir si + messages d'erreurs selon les situations
export const getAllStocks = async (req: Request, res: Response, connection: PoolConnection) => {
    try {
        const stockService = new StockService(connection);
        const stocks = await stockService.getAllStocks();
        res.status(200).json(stocks);
    } catch (err: any) {
        sendError(res, ErrorMessages.GetAllStocks, err);
    }
};

export const createStock = async (req: Request, res: Response, connection: PoolConnection) => {
    try {
        // const stock: Partial<StockToCreate> = extractDataFromRequestBody(req, ['LABEL', 'DESCRIPTION']);
        const {LABEL, DESCRIPTION} = req.body;
        if (!LABEL || !DESCRIPTION) {
            throw new BadRequestError("LABEL and DESCRIPTION are required to create a stock.", ErrorMessages.CreateStock);
        }
        const stockService = new StockService(connection);
        await stockService.createStock({LABEL, DESCRIPTION});
        res.json({message: "Stock created successfully."});
    } catch (err: any) {
        sendError(res, ErrorMessages.CreateStock, err);
    }
};

export const getStockDetails = async (req: Request, res: Response, connection: PoolConnection, ID: number) => {
    try {
        const stockService = new StockService(connection);
        const stock = await stockService.getStockDetails(ID);
        if (!stock) throw new NotFoundError("Stock not found.", ErrorMessages.GetStockDetails);
        res.json(stock);
    } catch (err: any) {
        sendError(res, ErrorMessages.GetStockDetails, err);
    }
};

export const getStockItems = async (req: Request, res: Response, connection: PoolConnection, ID: number) => {
    try {
        const stockService = new StockService(connection);
        const items = await stockService.getStockItems(ID);
        res.json(items);
    } catch (err: any) {
        sendError(res, ErrorMessages.GetStockItems, err);
    }
};

export const updateStockItemQuantity = async (req: Request, res: Response, connection: PoolConnection) => {
    try {
        const itemID = Number(req.params.itemID);
        const {QUANTITY} = req.body;
        const stockID = Number(req.params.stockID);

        if (!itemID || QUANTITY === undefined) throw new ValidationError("ID and QUANTITY must be provided.", ErrorMessages.UpdateStockItemQuantity);

        const stockService = new StockService(connection);
        const updateRequest = new UpdateStockRequest(itemID, QUANTITY, stockID);
        await stockService.updateStockItemQuantity(updateRequest);
        res.json({message: "Stock updated successfully."});
    } catch (err: any) {
        sendError(res, ErrorMessages.UpdateStockItemQuantity, err);
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
        if (err instanceof ValidationError) {
            sendError(res, ErrorMessages.ValidationError, err);
        } else {
            sendError(res, ErrorMessages.AddStockItem, err);
        }
    }
};

export const deleteStockItem = async (req: Request, res: Response, connection: PoolConnection, stockID: number, itemID: number) => {
    try {
        const stockService = new StockService(connection);
        const result = await stockService.deleteStockItem(stockID, itemID);
        if (result.affectedRows === 0) throw new NotFoundError("Item not found or already deleted.", ErrorMessages.DeleteStockItem);
        res.status(200).json({message: "Stock item deleted successfully."});
    } catch (err: any) {
        sendError(res, ErrorMessages.DeleteStockItem, err);
    }
};

export const getAllItems = async (req: Request, res: Response, connection: PoolConnection) => {
    try {
        const stockService = new StockService(connection);
        const items = await stockService.getAllItems();
        res.status(200).json(items);
    } catch (err: any) {
        sendError(res, ErrorMessages.GetAllItems, err);
    }
};

export const getItemDetails = async (req: Request, res: Response, connection: PoolConnection, itemID: number) => {
    try {
        const stockService = new StockService(connection);
        const items = await stockService.getItemDetails(itemID);
        if (items.length === 0) throw new NotFoundError("Item not found.", ErrorMessages.GetItemDetails);
        res.json(items[0]);
    } catch (err: any) {
        sendError(res, ErrorMessages.GetItemDetails, err);
    }
};