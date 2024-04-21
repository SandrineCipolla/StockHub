import {Request, Response} from "express";

import {FieldPacket, PoolConnection, RowDataPacket} from "mysql2/promise";
import {StockRepository} from "../repositories/stockRepository";

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
    stock: { id: number; label: string; description: string; }
) => {
    try {
        const {id, label, description} = stock;
        await connection.query("INSERT INTO stocks VALUES (?, ?, ?)", [
            id,
            label,
            description,
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
    ID: number,
    QUANTITY: number,
    STOCK_ID: number,
) => {
    try {
        const updatedStockItem = await StockRepository.updateStockItemQuantity(connection, ID, QUANTITY, STOCK_ID);
        res.json(updatedStockItem);
    } catch (err) {
        //TODO :affiner les message d'erreur.
        console.error('Error in updateStockItemQuantity:', err);
        res.status(500).json({error: 'Error while updating the database.'});
    }
}

export const addStockItem = async (
    res: Response,
    connection: PoolConnection,
    stockID: number,
    item: { id: number; label: string; description: string; quantity: number }
) => {
    try {
        const {id, label, description,quantity} = item;
        await connection.query("INSERT INTO items VALUES (?, ?, ?, ? ,?)", [
            id,
            label,
            description,
            quantity,
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