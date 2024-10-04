import {ErrorMessages, NotFoundError} from "../errors";
import {ReadUserRepository} from "./readUserRepository";

export class UserService {
   // private writeUserRepository: WriteUserRepository;
    private readUserRepository: ReadUserRepository;

    constructor(
        readUser: ReadUserRepository,
       // writeUser: WriteUserRepository,

    ) {
        this.readUserRepository = readUser;
       // this.writeUserRepository = writeUser;
    }

    async convertOIDtoUserID(oid: string) {
        const userID = await this.readUserRepository.readUserByOID(oid);
        if (!userID) {
            throw new NotFoundError("User not found.", ErrorMessages.ConvertOIDtoUserID);
        }
        return userID;
    }


}

