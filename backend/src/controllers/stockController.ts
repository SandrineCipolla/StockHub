import {Request, Response} from "express";

import {FieldPacket, PoolConnection, RowDataPacket} from "mysql2/promise";

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