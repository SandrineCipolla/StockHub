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
        // Vérifier si chaque stock a une propriété 'id'
        const isIdMissing = stocks.some((stock) => stock.id === undefined);


        console.log('isIdMissing', isIdMissing)
        if (isIdMissing) {
            // Si l'ID est manquant, générer une erreur
            throw new Error("Column 'id' is missing in some stocks");
        }

        if (res && res.json) {
            res.json(stocks);
        } else {
            throw new Error("Response or res.json is undefined. Cannot call res.status and res.json for error handling.");
        }
    } catch (err) {
        throw err; // Lancer l'erreur pour qu'elle soit capturée par le bloc catch du test
    }
};