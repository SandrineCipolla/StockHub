import {PoolConnection, ResultSetHeader} from "mysql2/promise";
import {Stock, StockToCreate, UpdateStockRequest} from "../models";
import {ValidationError} from "../errors";

export class WriteStockRepository {
    private connection: PoolConnection;

    constructor(connection: PoolConnection) {
        this.connection = connection;
    }

    async updateStockItemQuantity(updateRequest: UpdateStockRequest) {
        const {itemID, quantity, stockID} = updateRequest;

        if (quantity === undefined) {
            throw new ValidationError("Quantity is undefined");
        }
        await this.connection.execute(
            "UPDATE items SET QUANTITY = ? WHERE ID = ? AND STOCK_ID = ?",
            [quantity, itemID, stockID]
        );

        return {itemID, quantity, stockID};
    }

    async addStockItem(item: Partial<Stock>, stockID: number) {
        if (!item.label || !item.description || item.quantity === undefined) {
            throw new ValidationError("Label, description and quantity must be provided.");
        }
        if (item.quantity < 1) {
            throw new ValidationError("Quantity must be a positive number.");
        }
        await this.connection.query("INSERT INTO items VALUES (?, ?, ?, ? ,?)", [
            item.id,
            item.label,
            item.description,
            item.quantity,
            stockID
        ]);
    }

    async createStock(stock: Partial<StockToCreate>) {
        await this.connection.query("INSERT INTO stocks(LABEL, DESCRIPTION) VALUES (?, ?)", [
            stock.LABEL,
            stock.DESCRIPTION,
        ]);
    }

    async deleteStockItem(stockID: number, itemID: number): Promise<ResultSetHeader> {
        const [result] = await this.connection.execute<ResultSetHeader>(
            "DELETE FROM items WHERE ID = ? AND STOCK_ID = ?",
            [itemID, stockID]
        );
        return result;
    }
}