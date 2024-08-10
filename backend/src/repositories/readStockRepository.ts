import {FieldPacket, PoolConnection, RowDataPacket} from "mysql2/promise";

export const readAllStocks = async (
    connection: PoolConnection
) => {
    try {
        const stocks = (await connection.query("SELECT * FROM stocks")) as [
            RowDataPacket[],
            FieldPacket[]
        ];
        return stocks[0]
    }
    catch(err :any) {
        console.log('Error occured when retrieving all stocks', err);
        throw err;
    }
}