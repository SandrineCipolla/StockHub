import {ErrorMessages, NotFoundError} from "../errors";
import {ReadUserRepository} from "./readUserRepository";
import {WriteUserRepository} from "./writeUserRepository";

export class UserService {
    private readUserRepository: ReadUserRepository;
    private writeUserRepository: WriteUserRepository;

    constructor(
        readUser: ReadUserRepository,
        writeUser: WriteUserRepository,
    ) {
        this.readUserRepository = readUser;
        this.writeUserRepository = writeUser;
    }

    async convertOIDtoUserID(oid: string) {
        try {
            const userID = await this.readUserRepository.readUserByOID(oid);
            if (!userID) {
                throw new NotFoundError("User not found.", ErrorMessages.ConvertOIDtoUserID);
            }
            return userID;
        } catch (error) {
            const err = error as Error;
            console.error(`Error converting OID to UserID: ${err.message}`);
            throw err;
        }
    }

    async addUser(email: string) {
        await this.writeUserRepository.addUser(email);
    }


}

