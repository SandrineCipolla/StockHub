import {Request, Response} from "express";

import {FieldPacket, OkPacket, PoolConnection, RowDataPacket} from "mysql2/promise";
import {StockRepository} from "../repositories/stockRepository";
import {extractDataFromRequestBody} from "../Utils/requestUtils";
import {Stock, UpdateStockRequest} from "../models";
import {createUpdatedItemQuantity} from "../Utils/itemFactory";
import {ValidationError} from "../errors";


export const getAllStocks = async (
    req: Request,
    res: Response,
    connection: PoolConnection
) => {
    try {
        const [stocks] = (await connection.query("SELECT * FROM stocks")) as [
            RowDataPacket[],
            FieldPacket[]
        ];

        if (res) {
            res.status(200).json(stocks);
        } else {
            throw new Error("Response is undefined. Cannot call res.status and res.json for error handling.");
        }
    } catch (err: any) {
        console.error(err);
        if (res) {
            //TODO :affiner les message d'erreur.
            //TODO :créer une const pour le console.error
            res.status(500).json({error: err.message});
        }
        throw err;
    }
};

export const createStock = async (
    req: Request,
    res: Response,
    connection: PoolConnection,
) => {
    try {
        const stock: Partial<Stock> = extractDataFromRequestBody(req, ['id', 'label', 'description']);
        await connection.query("INSERT INTO stocks VALUES (?, ?, ?)", [
            stock.id,
            stock.label,
            stock.description,
        ]);

        if (res && res.json) {
            res.json({message: "Stock created successfully."});
        } else {
            throw new Error(
                "Response or res.json is undefined. Cannot call res.status and res.json for error handling."
            );
        }
    } catch (err: any) {
        console.error(err);
        if (res && res.json) {
            //TODO :affiner les message d'erreur.
            res.json({error: err.message});
        }
        throw err;
    }
};

export const getStockDetails = async (
    req: Request,
    res: Response,
    connection: PoolConnection,
    ID: number
) => {
    try {
        const [stock] = (await connection.query(
            "SELECT * FROM stocks WHERE ID = ?",
            [ID]
        )) as [RowDataPacket[], FieldPacket[]];

        if (res && res.json) {
            res.json(stock);
        } else {
            throw new Error(
                "Response or res.json is undefined. Cannot call res.status and res.json for error handling."
            );
        }
    } catch (err: any) {
        console.error(err);
        if (res && res.json) {
            //TODO :affiner les message d'erreur.
            res.json({error: err.message});
        }
        throw err;
    }
};

export const getStockItems = async (
    req: Request,
    res: Response,
    connection: PoolConnection,
    ID: number
) => {
    try {
        const [items] = (await connection.query(
            "SELECT * FROM items WHERE STOCK_ID = ?",
            [ID]
        )) as [RowDataPacket[], FieldPacket[]];

        if (res && res.json) {
            res.json(items);
        } else {
            throw new Error(
                "Response or res.json is undefined. Cannot call res.status and res.json for error handling."
            );
        }
    } catch (err: any) {
        console.error(err);
        if (res && res.json) {
            //TODO :affiner les message d'erreur.
            res.json({error: err.message});
        }
        throw err;
    }
};

export const updateStockItemQuantity = async (
    req: Request,
    res: Response,
    connection: PoolConnection,
) => {
    try {
        const itemID = Number(req.params.itemID);
        const {QUANTITY} = req.body;
        const stockID = Number(req.params.stockID);

        const updatedItemQuantity: Partial<Stock> = createUpdatedItemQuantity(itemID, QUANTITY);

        console.info('Stock item update', updatedItemQuantity, 'with stock id', stockID)

        if (updatedItemQuantity.id === undefined || updatedItemQuantity.quantity === undefined) {
            res.status(400).json({error: 'ID and QUANTITY must be provided.'});
            return;
        }
        //await StockRepository.updateStockItemQuantity(connection, updatedItemQuantity.id, updatedItemQuantity.quantity, stockID);
        const updateRequest = new UpdateStockRequest(updatedItemQuantity.id, updatedItemQuantity.quantity, stockID);
        await StockRepository.updateStockItemQuantity(connection, updateRequest);
        res.json({message: "Stock updated successfully."});
    } catch (err) {
        //TODO :affiner les message d'erreur.
        console.error('Error in updateStockItemQuantity:', err);
        res.status(500).json({error: 'Error while updating the database.'});
    }
};

export const addStockItem = async (
    req: Request,
    res: Response,
    connection: PoolConnection,
    stockID: number,
) => {
    try {

        const itemUpdated: Partial<Stock> = {
            id: undefined,
            label: req.body['LABEL'],
            description: req.body['DESCRIPTION'],
            quantity: req.body['QUANTITY']
        }

        await StockRepository.addStockItem(connection, itemUpdated, stockID);
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

export const deleteStockItem = async (
    req: Request,
    res: Response,
    connection: PoolConnection,
    stockID: number,
    itemID: number
) => {
    try {
        const { ITEM } = req.body;
        // Vérification si l'ITEM dans le corps de la requête correspond à l'itemID dans l'URL
        if (ITEM !== itemID) {
            return res.status(400).json({ error: "Item ID in the body does not match item ID in the URL" });
        }
        // Suppression de la BDD
        const [result] = await connection.query<OkPacket>("DELETE FROM items WHERE ID = ? AND STOCK_ID = ?", [itemID, stockID]);

        // Vérification de la suppression de l'item
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Item not found or already deleted" });
        }

        res.status(200).json({ message: "Stock item deleted successfully." });
    } catch (err: any) {
        console.error(`Error in deleteStockItem:`, err);
        res.status(500).json({ error: "Error while deleting the stock item from the database." });
    }
};