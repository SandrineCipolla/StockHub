import {PoolConnection} from "mysql2/promise";

export class StockRepository {
    static async updateStockItemQuantity(connection: PoolConnection, ID: number, QUANTITY: number, STOCK_ID: number) {
        try {
            if (QUANTITY === undefined) {
                throw new Error("Quantity is undefined");
            }
            await connection.execute(
                "UPDATE items SET QUANTITY = ? WHERE ID = ? AND STOCK_ID = ?",
                [QUANTITY, ID, STOCK_ID])

            return {ID, QUANTITY, STOCK_ID};

        } catch (err) {
            console.error('Error in updateStockItemQuantity:', err);
            throw new Error('Error while updating the database.');
        }
    }

    static async addStockItem(connection: PoolConnection, ID: number,LABEL:string, DESCRIPTION:string, QUANTITY: number, STOCK_ID: number) {
        try {
            if (QUANTITY === undefined) {
                throw new Error("Quantity is undefined");
            }
            await connection.execute(
                "UPDATE items SET QUANTITY = ? WHERE ID = ? AND STOCK_ID = ?",
                [QUANTITY, ID, STOCK_ID])

            return {ID, QUANTITY, STOCK_ID};

        } catch (err) {
            console.error('Error in updateStockItemQuantity:', err);
            throw new Error('Error while updating the database.');
        }
    }
}
