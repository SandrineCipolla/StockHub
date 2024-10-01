import {FieldPacket, PoolConnection, RowDataPacket} from "mysql2/promise";
import {ErrorMessages, NotFoundError} from "../errors";

export class ReadUserRepository {
    private connection: PoolConnection;

    constructor(connection: PoolConnection) {
        this.connection = connection;
    }

    async readUserByOID(oid: string) {
        // const userID = await this.connection.query("SELECT ID FROM users WHERE EMAIL = ?", [oid]) as [RowDataPacket[], FieldPacket[]];
        // return userID[0][0].ID;

        const query = 'SELECT ID FROM users WHERE EMAIL = ?';
        const [rows]:[RowDataPacket[],FieldPacket[]] = await this.connection.execute(query, [oid]);

        if (!rows || rows.length === 0) {
            console.error(`User not found for OID: ${oid}`);
            throw new NotFoundError("User not found.", ErrorMessages.ConvertOIDtoUserID);
        }

        const user = rows[0];
        if (!user || !user.ID) {
            console.error(`User ID not found for OID: ${oid}`);
            throw new NotFoundError("User ID not found.", ErrorMessages.ConvertOIDtoUserID);
        }
        console.log(`User ID found: ${user.ID} for OID: ${oid}`)
        return user.ID;
    }

}