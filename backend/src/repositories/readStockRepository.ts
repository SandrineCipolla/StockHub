import {FieldPacket, PoolConnection, RowDataPacket} from "mysql2/promise";

export const readAllStocks = async (
    connection: PoolConnection
) => {
    const stocks = (await connection.query("SELECT * FROM stocks")) as [
        RowDataPacket[],
        FieldPacket[]
    ];
    return stocks[0]
};

export const readStockDetails = async (connection: PoolConnection, ID: number) => {
    const [stock] = (await connection.query("SELECT * FROM stocks WHERE ID = ?", [ID])) as [RowDataPacket[], FieldPacket[]];
    return stock;
};

export const readStockItems = async (connection: PoolConnection, ID: number) => {
    const [items] = (await connection.query("SELECT * FROM items WHERE STOCK_ID = ?", [ID])) as [RowDataPacket[], FieldPacket[]];
    return items;
};

export const readAllItems = async (connection: PoolConnection) => {
    const [items] = (await connection.query("SELECT * FROM items")) as [RowDataPacket[], FieldPacket[]];
    return items;
};

export const readItemDetails = async (connection: PoolConnection, itemID: number) => {
    const [items] = (await connection.query("SELECT * FROM items WHERE ID = ?", [itemID])) as [RowDataPacket[], FieldPacket[]];
    return items;
};