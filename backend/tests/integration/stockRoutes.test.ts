import express, { Express } from "express";
import request from "supertest";
import configureStockRoutes from "../../src/routes/stockRoutes";
import { fakeStocks } from "../__mocks__/mockedData";
import { PoolConnection } from "mysql2/promise";
import { connectToDatabase } from "../../src/index";
import { mockConnection } from "../__mocks__/connectionUtils";

//Simulation connectToDatabase
//jest.mock("../../src/db");

describe("Stock Routes", () => {
  let mockConnection: PoolConnection;
  let app: Express;

  beforeAll(() => {
    mockConnection = {
      query: jest.fn(),
    } as unknown as PoolConnection;

    // jest.mock("mysql2/promise", () => ({
    //   createPool: jest.fn().mockReturnValue({
    //     getConnection: jest.fn().mockResolvedValue(mockConnection),
    //   }),
    // }));
    jest.mock("../../src/db", () => ({
      connectToDatabase: jest.fn().mockResolvedValue(mockConnection),
    }));
  });
  beforeEach(() => {
    (mockConnection.query as jest.Mock).mockResolvedValueOnce([fakeStocks]);
    console.log(mockConnection.query);

    app = express();
    app.use("/api/v1", configureStockRoutes());
  });

  it("should handle GET /stocks route", async () => {
    console.log("Running test: should handle GET /stocks route...");
    const response = await request(app).get("/api/v1/stocks");
    console.log("Response status:", response.status);
    console.log("Response body:", response.body);
    expect(response.status).toBe(200); // 200 = ok
    expect(response.body).toBeDefined(); // 
    // expect(response.body).toEqual(fakeStocks);
  });
});
