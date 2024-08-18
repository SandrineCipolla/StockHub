import {OkPacket, PoolConnection, ResultSetHeader} from "mysql2/promise";
import {Stock, StockToCreate, UpdateStockRequest} from "../models";
import {ValidationError} from "../errors";

export class WriteStockRepository {
    static async updateStockItemQuantity(connection: PoolConnection, updateRequest: UpdateStockRequest) {
        const {itemID, quantity, stockID} = updateRequest;

        if (quantity === undefined) {
            throw new ValidationError("Quantity is undefined");
        }
        await connection.execute(
            "UPDATE items SET QUANTITY = ? WHERE ID = ? AND STOCK_ID = ?",
            [quantity, itemID, stockID])

        return {itemID, quantity, stockID};
    }

    static async addStockItem(connection: PoolConnection, item: Partial<Stock>, stockID: number) {

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
    }

    static async createStock(connection: PoolConnection, stock: Partial<StockToCreate>) {
        await connection.query("INSERT INTO stocks(LABEL, DESCRIPTION) VALUES (?, ?)", [
            stock.LABEL,
            stock.DESCRIPTION,
        ]);
    }

    static async deleteStockItem(connection: PoolConnection, stockID: number, itemID: number): Promise<ResultSetHeader> {
        const [result] = await connection.execute<ResultSetHeader>("DELETE FROM items WHERE ID = ? AND STOCK_ID = ?", [itemID, stockID]);
        return result;
    }
}
