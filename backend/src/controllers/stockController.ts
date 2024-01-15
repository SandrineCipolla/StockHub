import { Request, Response } from "express";
//import connection from "../db";


// export const getAllStocks = async (req: Request, res: Response) => {
//   try {
//     const [stocks] = await connection.promise().query("SELECT * FROM stocks");
//     res.json(stocks);
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ error: "Erreur lors de la requête à la base de données." });
//   }
// };

// controller.ts


//import { Connection } from "mysql2/promise";
import { Connection, RowDataPacket, FieldPacket, PoolConnection } from "mysql2/promise";

// export const getAllStocks = async (req: Request, res: Response, connection: Connection) => {
//   try {
//     const [stocks, fields] = await connection.query("SELECT * FROM stocks")as [RowDataPacket[], FieldPacket[]];
//     res.json(stocks);
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ error: "Erreur lors de la requête à la base de données." });
//   }
// };

export const getAllStocks = async (req: Request, res: Response, connection: PoolConnection) => {
  try {
    const [stocks, fields] = await connection.query("SELECT * FROM stocks") as [RowDataPacket[], FieldPacket[]];
    res.json(stocks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la requête à la base de données." });
  }
};
