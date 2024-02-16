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

export const createStock = async (
  req: Request,
  res: Response,
  connection: PoolConnection,
  stock: { id:number; label: string; description: string; quantity: number }
) => {
  try {
    const { id, label, description, quantity } = stock;
    await connection.query("INSERT INTO stocks VALUES (?, ?, ?, ?)", [
      id,
      label,
      description,
      quantity,
    ]);

    if (res && res.json) {
      res.json({ message: "Stock created successfully." });
    } else {
      throw new Error(
        "Response or res.json is undefined. Cannot call res.status and res.json for error handling."
      );
    }
  } catch (err: any) {
    console.error(err);
    if (res && res.json) {
      res.json({ error: err.message });
    }
    throw err;
  }
};