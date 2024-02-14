import { Request, Response } from "express";

import { FieldPacket, PoolConnection, RowDataPacket } from "mysql2/promise";

// export const getAllStocks = async (
//   req: Request,
//   res: Response,
//   connection: PoolConnection
// ) => {
//   try {
//     const [stocks] = (await connection.query("SELECT * FROM stocks")) as [
//       RowDataPacket[],
//       FieldPacket[]
//     ];
//     // Vérifier si chaque stock a une propriété 'id'
//     const isIdMissing = stocks.some((stock) => stock.id === undefined);

    
//     if (isIdMissing) {
//       // Si l'ID est manquant, générer une erreur
//       throw new Error("Column 'id' is missing in some stocks");
//     }

//     if (res && res.json) {
//       res.json(stocks);
//     } else {
//       throw new Error(
//         "Response or res.json is undefined. Cannot call res.status and res.json for error handling."
//       );
//     }
//   } catch (err: any) {
//     console.error(err); // Enregistrer l'erreur
//     if (res && res.json) {
//       res.json({ error: err.message }); // Envoyer une réponse d'erreur au client
//     }
//     throw err; // Rejeter l'erreur pour que le test puisse la détecter
//   }
// };


// Fonction pour récupérer les stocks de la base de données
export async function getStocksFromDatabase(connection: PoolConnection): Promise<RowDataPacket[]> {
  const [stocks] = (await connection.query("SELECT * FROM stocks")) as [RowDataPacket[], FieldPacket[]];
  const isIdMissing = stocks.some((stock) => stock.id === undefined);

  if (isIdMissing) {
    throw new Error("Column 'id' is missing in some stocks");
  }

  return stocks;
}

export const getAllStocks = async (req: Request, res: Response, connection: PoolConnection) => {
  if (!res || !res.json) {
    console.error("Response or res.json is undefined. Cannot call res.status and res.json for error handling.");
    return;
  }

  try {
    const stocks = await getStocksFromDatabase(connection);
    res.json(stocks);
  } catch (err: any) {
    console.error(err);
    res.json({ error: err.message });
  }
};