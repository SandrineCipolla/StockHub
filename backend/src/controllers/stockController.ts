import { Request, Response } from "express";

import { RowDataPacket, FieldPacket, PoolConnection } from "mysql2/promise";

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
    if (res && res.json) {
      res.json(stocks);
    } else {
    }
  } catch (err) {
    if (res && res.json()) {
      res
        .status(500)
        .json({ error: "Erreur lors de la requête à la base de données." });
    } else {
      console.log(
        "Response or res.json is undefined. Cannot call res.status and res.json for error handling."
      );
    }
  }
};
