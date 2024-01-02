import { Request, Response } from "express";
import connection from "../db";

export const getAllStocks = async (req: Request, res: Response) => {
  try {
    const [results] = await connection.promise().query('SELECT * FROM stocks');
    res.json(results);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la requête à la base de données." });
  }
};
