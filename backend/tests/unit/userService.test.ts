import {UserService} from '../../src/services/userService';

import {ErrorMessages, NotFoundError} from '../../src/errors';
import {ReadUserRepository} from "../../src/services/readUserRepository";
import { WriteUserRepository } from '../../src/services/writeUserRepository';

describe('UserService', () => {
    let userService: UserService;
    let mockReadUserRepository: jest.Mocked<ReadUserRepository>;
    let mockWriteUserRepository: jest.Mocked<WriteUserRepository>;

    beforeEach(() => {
        mockReadUserRepository = {
            readUserByOID: jest.fn(),
        } as unknown as jest.Mocked<ReadUserRepository>;

        mockWriteUserRepository = {
            addUser: jest.fn(),
        } as unknown as jest.Mocked<WriteUserRepository>;

        userService = new UserService(mockReadUserRepository, mockWriteUserRepository);
    });

    describe('convertOIDtoUserID', () => {

        it('should return the user ID when user is found', async () => {
            const mockUserID = 123;
            const mockOID = 'mock-oid';

            mockReadUserRepository.readUserByOID.mockResolvedValue(mockUserID);

            const userID = await userService.convertOIDtoUserID(mockOID);
            expect(userID).toBe(mockUserID);
            expect(mockReadUserRepository.readUserByOID).toHaveBeenCalledWith(mockOID);
        });

        it('should throw NotFoundError when user is not found', async () => {
            const mockOID = 'mock-oid';

            mockReadUserRepository.readUserByOID.mockResolvedValue(undefined);

            await expect(userService.convertOIDtoUserID(mockOID))
                .rejects
                .toThrow(new NotFoundError("User not found.", ErrorMessages.ConvertOIDtoUserID));

            expect(mockReadUserRepository.readUserByOID).toHaveBeenCalledWith(mockOID);
        });
    });

    describe('addUser', () => {
        it('should add a new user', async () => {
            const email = 'test@example.com';

            await userService.addUser(email);

            expect(mockWriteUserRepository.addUser).toHaveBeenCalledWith(email);
        });
    });
});
