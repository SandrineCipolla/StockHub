import {ErrorMessages, NotFoundError} from "../errors";
import {ReadUserRepository} from "./readUserRepository";
import {WriteUserRepository} from "./writeUserRepository";

class UserIdentifier {
    public readonly empty: boolean;
    public readonly value: number;

    constructor( oid: string){
        this.empty = !oid;
        this.value = parseInt(oid);
    }
}

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
            return new UserIdentifier(userID);
        } catch (error) {
            const err = error as Error;
            console.error(`Error converting OID to UserID: ${err.message}`);
            throw err;
        }
    }

    async addUser(email: string) {
        await this.writeUserRepository.addUser(email);
        return await this.convertOIDtoUserID(email);
    }



}

