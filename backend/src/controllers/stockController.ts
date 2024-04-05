import {Request, Response} from "express";

import {FieldPacket, PoolConnection, RowDataPacket} from "mysql2/promise";
import {OkPacket} from "mysql";

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
        console.error(err); // Enregistrer l'erreur
        if (res) {
            res.status(500).json({error: err.message}); // Envoyer une réponse d'erreur au client
        }
        throw err; // Rejeter l'erreur pour que le test puisse la détecter
    }
};

export const createStock = async (
    req: Request,
    res: Response,
    connection: PoolConnection,
    stock: { id: number; label: string; description: string; quantity: number }
) => {
    try {
        const {id, label, description, quantity} = stock;
        await connection.query("INSERT INTO stocks VALUES (?, ?, ?, ?)", [
            id,
            label,
            description,
            quantity,
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
            res.json({error: err.message});
        }
        throw err;
    }
};

export const updateStockQuantity = async (
    req: Request,
    res: Response,
    connection: PoolConnection,
    ID: number,
    QUANTITY: number
) => {
    try {
        // Vérification si "quantité" est définie
        if (QUANTITY === undefined) {
            throw new Error("Quantity is undefined");
        }
        const [rows, okPacket] = await connection.execute(
            "UPDATE stocks SET QUANTITY = ? WHERE ID = ?",
            [QUANTITY, ID]
        ) as unknown as [RowDataPacket[], OkPacket];

        // Vérification de la réussite de l'update
        //     if (okPacket.affectedRows === 0) {
        //         res.status(404).json({message: 'Stock not found'});
        //         return;
        //     }
        //
        //     // Renvoyer le stock mis à jour
        //     res.json({ID, QUANTITY});
        // } catch
        //     (err) {
        //     console.error('Error in updateStockQuantity:', err);
        //     res.status(500).json({error: 'Error while updating the database.'});

        if (okPacket && okPacket.affectedRows !== undefined && okPacket.affectedRows > 0) {
            // Mise à jour réussie
            res.json({ID, QUANTITY});
        } else {
            // Aucune ligne mise à jour (peut-être que l'ID n'existe pas)
            res.status(404).json({message: 'Stock not found or quantity not updated'});
        }
    } catch (err) {
        console.error('Error in updateStockQuantity:', err);
        res.status(500).json({error: 'Error while updating the database.'});
    }
}