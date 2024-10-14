import {FieldPacket, PoolConnection, RowDataPacket} from "mysql2/promise";
import {Item} from "../models";

export class ReadStockRepository {
    private connection: PoolConnection;

    constructor(connection: PoolConnection) {
        this.connection = connection;
    }

    async readAllStocks(userID: number) {
        const [stocks] = await this.connection.query("SELECT * FROM stocks WHERE USER_ID = ?", [userID]) as [RowDataPacket[], FieldPacket[]];
        return stocks;
    }

    async readStockDetails(ID: number, userID: number) {
        const [stock] = await this.connection.query("SELECT * FROM stocks WHERE ID = ? AND USER_ID = ?", [ID, userID]) as [RowDataPacket[], FieldPacket[]];
        return stock;
    }

    async readStockItems(ID: number) {
        const [items] = await this.connection.query("SELECT * FROM items WHERE STOCK_ID = ?", [ID]) as [RowDataPacket[], FieldPacket[]];
        return items;
    }

    async readAllItems() {
        const [items] = await this.connection.query("SELECT * FROM items") as [RowDataPacket[], FieldPacket[]];
        return items;
    }

    async readItemDetails(itemID: number) {
        const [items] = await this.connection.query("SELECT * FROM items WHERE ID = ?", [itemID]) as [RowDataPacket[], FieldPacket[]];
        return items;
    }

    async readLowStockItems() {
        const [items] = await this.connection.query(
            "SELECT items.*, stocks.LABEL AS stockLabel FROM items JOIN stocks ON items.STOCK_ID = stocks.id WHERE items.QUANTITY <= 1"
        ) as [RowDataPacket[], FieldPacket[]];

        return items;
    }
}