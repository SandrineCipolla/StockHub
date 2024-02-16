import { PoolConnection } from "mysql2/promise";
import { newStocks, Stock } from "../../tests/__mocks__/mockedData";

export interface TableColumn {
  column_name: string;
  data_type: string;
}

// export async function getTableStructure(connection: PoolConnection, tableName: string): Promise<TableColumn[]> {
//     try {
//         const query = `
//             SELECT column_name, data_type
//             FROM information_schema.columns
//             WHERE table_name = ?
//         `;
//         const result = await connection.query(query, [tableName]);
//         console.log('Result of query:', result);
//         const [rows] = result;
//
//         if (!rows) {
//             throw new Error(`Aucune donnée retournée pour la table ${tableName}`);
//         }
//         return rows as TableColumn[];
//     } catch
//         (error: any) {
//         throw new Error(`Erreur lors de la récupération de la structure de la table : ${error.message}`);
//     }
// }
export async function getTableStructure(
  connection: PoolConnection,
  tableName: string
): Promise<TableColumn[]> {
  try {
    console.log("Fetching table structure for table:", tableName);

    const query = `
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = ?
        `;
    console.log("Executing query:", query);

    const [rows] = await connection.query(query, [tableName]);
    console.log("rows", rows);
    if (!rows) {
    throw new Error(`No data returned for table ${tableName}`);
    }
    return rows as TableColumn[];
  } catch (error: any) {
    throw new Error(
        //Erreur lors de la récupération de la structure de la table
      `Error retrieving table structure : ${error.message}`
    );
  }
}

export async function insertStock(
  connection: PoolConnection,
  stocks: Stock[]
): Promise<void> {
  try {

    const values = stocks.map((stock) => [stock.id, stock.label, stock.description, stock.quantity]);

    const query = "INSERT INTO stocks (id, label,description, quantity) VALUES ?";

    await connection.query(query, [values]);

  } catch (error: any) {

    throw new Error(`Error inserting stocks : ${error.message}`);
  }
}
