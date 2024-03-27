import {Request} from "express";
import {getAllStocks} from "../../src/controllers/stockController";

import {fakeStocks} from "../__mocks__/mockedData";

import {PoolConnection} from "mysql2/promise";
import {
    createFakeDatabaseConnection,
    createMockedRequest,
    createMockedResponse,
    MockedResponse
} from "../__mocks__/connectionUtils";
import * as assert from "assert";


//Simulation connectToDatabase
jest.mock("../../src/dbUtils");

describe("Stock Controller", () => {
    let fakeConnection: PoolConnection;
    let req: Request;
    let res: MockedResponse

    beforeEach(() => {
        fakeConnection = createFakeDatabaseConnection();
        req = createMockedRequest();
        res = createMockedResponse();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should get all stocks", async () => {
        (fakeConnection.query as jest.Mock).mockResolvedValueOnce([fakeStocks]);

        await getAllStocks(req, res, fakeConnection);

        expect(fakeConnection.query as jest.Mock).toHaveBeenCalledWith(
            "SELECT * FROM stocks"
        );
        //expect(res.status).not.toHaveBeenCalledWith(500);
        //expect(res.getStatusCode()).toBe(200);
        assert.deepStrictEqual(res.getStatusCode(), 200);
        expect(res.json).toHaveBeenCalledWith(fakeStocks);
    });

    it("should handle and log database error", async () => {
        const mockQuery = jest.spyOn(fakeConnection, "query");
        const databaseError = new Error("Database Error");
        mockQuery.mockRejectedValueOnce(databaseError);

        const jsonSpy = jest.spyOn(res, "json");
        const consoleErrorSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {
            });

        try {
            await getAllStocks(req, res, fakeConnection);
        } catch (err) {
        }

        expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM stocks");
        expect(jsonSpy).toHaveBeenCalledWith({error: databaseError.message}); // erreur attendue
        expect(consoleErrorSpy).toHaveBeenCalledWith(databaseError);
    });
});
