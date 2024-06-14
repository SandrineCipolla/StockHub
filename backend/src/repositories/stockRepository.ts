import {PoolConnection} from "mysql2/promise";
import {Stock, UpdateStockRequest} from "../models";
import {ValidationError} from "../errors";

export class StockRepository {
    static async updateStockItemQuantity(connection: PoolConnection, updateRequest: UpdateStockRequest) {
        const { itemID, quantity, stockID } = updateRequest;
     //   try {
            if (quantity === undefined) {
                throw new ValidationError("Quantity is undefined");
            }
            await connection.execute(
                "UPDATE items SET QUANTITY = ? WHERE ID = ? AND STOCK_ID = ?",
                [quantity, itemID, stockID])

            return { itemID, quantity, stockID };

        // } catch (err) {
        //     console.error('Error in updateStockItemQuantity:', err);
        //     throw new Error('Error while updating the database.');
        // }
    }

    static async addStockItem(connection: PoolConnection, item: Partial<Stock>, stockID: number) {
       // try {
            if (!item.label || !item.description || item.quantity === undefined) {
                throw new ValidationError("Label, description and quantity must be provided.");
            }
            if (item.quantity < 1) {
                throw new ValidationError("Quantity must be a positive number.");
            }
            await connection.query("INSERT INTO items VALUES (?, ?, ?, ? ,?)", [
                item.id,
                item.label,
                item.description,
                item.quantity,
                stockID
            ]);
        // } catch (err) {
        //     console.error('Error in addStockItem:', err);
        //     throw new Error('Error while updating the database.');
        // }
    }
}
