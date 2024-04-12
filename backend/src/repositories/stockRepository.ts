// StockRepository.ts

import { PoolConnection, RowDataPacket, OkPacket } from "mysql2/promise";

export class StockRepository {
    static async updateStockQuantity(connection: PoolConnection, ID: number, QUANTITY: number) {
        try {
            if (QUANTITY === undefined) {
                throw new Error("Quantity is undefined");
            }
            const [rows, okPacket] = await connection.execute(
                "UPDATE stocks SET QUANTITY = ? WHERE ID = ?",
                [QUANTITY, ID]
            ) as unknown as [RowDataPacket[], OkPacket];

            if (okPacket && okPacket.affectedRows !== undefined && okPacket.affectedRows > 0) {
                return { ID, QUANTITY };
            } else {
                throw new Error("Stock not found or quantity not updated");
            }
        } catch (err) {
            console.error('Error in updateStockQuantity:', err);
            throw new Error('Error while updating the database.');
        }
    }
}
