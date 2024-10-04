import {UserService} from '../../src/services/userService';

import {ErrorMessages, NotFoundError} from '../../src/errors';
import {ReadUserRepository} from "../../src/services/readUserRepository";

describe('UserService', () => {
    let userService: UserService;
    let mockReadUserRepository: jest.Mocked<ReadUserRepository>;

    beforeEach(() => {
        mockReadUserRepository = {
            readUserByOID: jest.fn(),
        } as unknown as jest.Mocked<ReadUserRepository>;

        userService = new UserService(mockReadUserRepository);
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
});
