import {Request, Response} from 'express';
import {StockController} from '../../src/controllers/stockController';
import {StockService} from '../../src/services/stockService';
import {CustomError, sendError} from '../../src/errors';
import {mockReadRepo, mockWriteRepo} from "../__mocks__/mockedData";
import {ReadStockRepository} from "../../src/repositories/readStockRepository";
import {WriteStockRepository} from "../../src/repositories/writeStockRepository";
import {HTTP_CODE_OK} from "../../src/Utils/httpCodes";


jest.mock('../../src/services/stockService');
jest.mock('../../src/errors', () => ({
    sendError: jest.fn()
}));


describe('StockController', () => {
    let stockController: StockController;
    let req: Partial<Request>;
    let res: jest.Mocked<Response>;
    let mockedReadRepo: jest.Mocked<ReadStockRepository>;
    let mockedWriteRepo: jest.Mocked<WriteStockRepository>;

    beforeEach(() => {
        mockedReadRepo = mockReadRepo
        mockedWriteRepo = mockWriteRepo
        stockController = new StockController(mockedReadRepo, mockedWriteRepo);
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as jest.Mocked<Response>;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getAllStocks', () => {

        describe('when the service call is successful', () => {

            const mockStocks = [{id: 1, label: 'Stock 1', description: 'Description 1', quantity: 10}];

            it('should return 200 and the list of stocks on success', async () => {
                jest.spyOn(StockService.prototype, 'getAllStocks').mockResolvedValue(mockStocks);

                await stockController.getAllStocks(req as Request, res as Response);
                const result = res.json.mock.calls[0][0];

                expect(res.status).toHaveBeenCalledWith(HTTP_CODE_OK);
                expect(res.json).toHaveBeenCalledWith(mockStocks);
                expect(result).toStrictEqual(mockStocks);
            });

        });

        describe('when the service call fails', () => {
            const mockError = new Error('Database error');
            it('should call sendError with the correct error on failure', async () => {

                jest.spyOn(StockService.prototype, 'getAllStocks').mockRejectedValue(mockError);

                await stockController.getAllStocks(req as Request, res as Response);

                expect(sendError).toHaveBeenCalledWith(res, mockError as CustomError);
            });
        });

    });

});