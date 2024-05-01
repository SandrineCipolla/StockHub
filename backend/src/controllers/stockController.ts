import {Request, Response} from "express";

import {FieldPacket, PoolConnection, RowDataPacket} from "mysql2/promise";
import {StockRepository} from "../repositories/stockRepository";
import { extractDataFromRequestBody } from "../Utils/requestUtils";
import {Stock} from "../models";


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
        const stock:Partial<Stock> = extractDataFromRequestBody(req, ['id', 'label', 'description']);
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
    STOCK_ID: number,
) => {
    try {
        const updatedStockItem:Partial<Stock> =extractDataFromRequestBody(req, ['ID', 'QUANTITY', 'STOCK_ID']);
        if (updatedStockItem.id === undefined || updatedStockItem.quantity === undefined) {
            res.status(400).json({error: 'ID and QUANTITY must be provided.'});
            return;
        }
        await StockRepository.updateStockItemQuantity(connection,updatedStockItem.id, updatedStockItem.quantity, STOCK_ID);
        res.json({message: "Stock updated successfully."});
    } catch (err) {
        //TODO :affiner les message d'erreur.
        console.error('Error in updateStockItemQuantity:', err);
        res.status(500).json({error: 'Error while updating the database.'});
    }
}

export const addStockItem = async (
    req:Request,
    res: Response,
    connection: PoolConnection,
    stockID: number,
) => {
    try {
        const item:Partial<Stock> = extractDataFromRequestBody(req, ['ID', 'LABEL', 'DESCRIPTION', 'QUANTITY']);
        await connection.query("INSERT INTO items VALUES (?, ?, ?, ? ,?)", [
            item.id,
            item.label,
            item.description,
            item.quantity,
            stockID
        ]);

        if (res && res.json) {
            res.json({message: "Item created successfully."});
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