import {FieldPacket, PoolConnection, RowDataPacket} from "mysql2/promise";

export class ReadUserRepository {
    private connection: PoolConnection;

    constructor(connection: PoolConnection) {
        this.connection = connection;
    }

    async readUserByOID(oid: string) {
        const userID = await this.connection.query("SELECT ID FROM users WHERE EMAIL = ?", [oid]) as [RowDataPacket[], FieldPacket[]];
        return userID[0][0].ID;
    }
}