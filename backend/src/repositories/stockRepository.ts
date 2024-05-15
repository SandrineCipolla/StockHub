import {PoolConnection} from "mysql2/promise";
import {Stock} from "../models";

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

    static async addStockItem(connection: PoolConnection, item: Partial<Stock>, stockID: number) {
        try {
            if (!item.label || !item.description || item.quantity === undefined) {
                throw new Error("Label, description and quantity must be provided.");
            }
            if (item.quantity < 1) {
                throw new Error("Quantity must be a positive number.");
            }
            await connection.query("INSERT INTO items VALUES (?, ?, ?, ? ,?)", [
                item.id,
                item.label,
                item.description,
                item.quantity,
                stockID
            ]);
        } catch (err) {
            console.error('Error in addStockItem:', err);
            throw new Error('Error while updating the database.');
        }
    }
}
