import {FieldPacket, PoolConnection, RowDataPacket} from "mysql2/promise";

export class ReadStockRepository {
    private connection: PoolConnection;

    constructor(connection: PoolConnection) {
        this.connection = connection;
    }

    async readAllStocks() {
        const [stocks] = await this.connection.query("SELECT * FROM stocks") as [RowDataPacket[], FieldPacket[]];
        return stocks;
    }

    async readStockDetails(ID: number) {
        const [stock] = await this.connection.query("SELECT * FROM stocks WHERE ID = ?", [ID]) as [RowDataPacket[], FieldPacket[]];
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
}