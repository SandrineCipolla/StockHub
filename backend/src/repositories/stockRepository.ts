import {PoolConnection} from "mysql2/promise";

export class StockRepository {
    static async updateStockQuantity(connection: PoolConnection, ID: number, QUANTITY: number) {
        try {
            if (QUANTITY === undefined) {
                throw new Error("Quantity is undefined");

            }
            console.log('Updated stock detail:', {ID, QUANTITY});

            await connection.execute(
                "UPDATE stocks SET QUANTITY = ? WHERE ID = ?",
                [QUANTITY, ID])

            return {ID, QUANTITY};

        } catch (err) {
            console.error('Error in updateStockQuantity:', err);
            throw new Error('Error while updating the database.');
        }
    }
}
