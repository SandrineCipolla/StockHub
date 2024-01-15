import { mockConnection } from "./mocks";
import { Request, Response } from "express";
import { getAllStocks } from "../src/controllers/stockController";
//import { connectToDatabase } from "../src/index";
import { fakeStocks } from "./mockedData";

//import db from "../src/db";
//import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { Connection, FieldPacket, PoolConnection, RowDataPacket } from "mysql2/promise";

//Simulation connectToDatabase

// jest.mock('../src/index', () => ({
//   ...jest.requireActual('../src/index'),
//   connectToDatabase: jest.fn()
// }));
// jest.mock("../src/db", () => {
//   promise: () => (query: string) => ["hello world", query];
// });

// // Mock la fonction createDatabaseConnection
// jest.mock('../src/db', () => ({
//   createDatabaseConnection: jest.fn(),
// }));

// describe('Stock Controller', () => {
//   it('should get all stocks', async () => {
//     const fakeConnection: PoolConnection = {} as PoolConnection;
    
//     // Définir le type de mockQuery explicitement
//     const mockQuery = jest.fn() as unknown as (sql: string, values?: any) => Promise<any[]>;
    
//     // Définir l'implémentation du mock
//     mocked(fakeConnection.query).mockImplementationOnce(mockQuery);

//     const req = {} as Request;
//     const res = {} as Response;

//     await getAllStocks(req, res, fakeConnection);

//     expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM stocks');
//     // Add additional expectations as needed
//   });
// });
jest.mock('../src/db');

describe('Stock Controller', () => {
  it('should get all stocks', async () => {
    const fakeConnection: PoolConnection = {} as PoolConnection;
    const req = {} as Request;
    const res: Response = {
      status: jest.fn(), // Mock la fonction status
      json: jest.fn() // Mock la fonction json
    } as unknown as Response;
    
    // Obtenez le mock de la fonction query
    const mockQuery = jest.fn();
    fakeConnection.query = mockQuery;
    
    // Définissez l'implémentation du mock pour la fonction query
    mockQuery.mockResolvedValueOnce([fakeStocks]);

   
    await getAllStocks(req, res, fakeConnection);

    expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM stocks');
    expect(res.status).not.toHaveBeenCalledWith(500); // Assurez-vous que status n'est pas appelé avec 500
    expect(res.json).toHaveBeenCalledWith(fakeStocks);
  });
});



// describe("getAllStocks controller", () => {
//   const mockRequest = {} as Request;
//   const mockResponse = {
//     json: jest.fn() as jest.Mock,
//     status: jest.fn().mockReturnThis() as jest.Mock,
//   } as unknown as Response;

//   beforeEach(() => {
//     // (createDatabaseConnection as jest.Mock).mockReturnValueOnce({
//     //   query: jest.fn().mockResolvedValueOnce([fakeStocks]),
//     // });
//     const mockQuery = jest.fn().mockResolvedValueOnce([fakeStocks]) as jest.MockedFunction<(sql: string) => Promise<[RowDataPacket[], FieldPacket[]]>>;
//     (createDatabaseConnection as jest.Mock).mockReturnValueOnce({
//       query: mockQuery,
//     });
//   });
  

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should return stocks on successful database query", async () => {
//     // (connectToDatabase as jest.Mock).mockResolvedValueOnce(fakeStocks);
//     console.log("🚀 ~ it ~ fakeStocks:", fakeStocks);

//     await getAllStocks(mockRequest, mockResponse, {} as Connection);

//     // Assurez-vous que l'appel à `json` a été fait avec les résultats attendus
//     expect(mockResponse.json).toHaveBeenCalledWith(fakeStocks);

//     // Assurez-vous que l'appel à `status` n'a pas été fait
//     expect(mockResponse.status).not.toHaveBeenCalled();
//   });

  // it("should handle database query error", async () => {
  //   const mockError = new Error("Database error");
  //   (connectToDatabase as jest.Mock).mockRejectedValueOnce(mockError);

  //   await getAllStocks(mockRequest, mockResponse);

  //   expect(mockResponse.status).toHaveBeenCalledWith(500);
  //   expect(mockResponse.json).toHaveBeenCalledWith({
  //     error: "Erreur lors de la requête à la base de données.",
  //   });
  // });



function mocked(query: { <T extends import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader[] | RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ProcedurePacket").ProcedureCallPacket>(sql: string): Promise<[T, FieldPacket[]]>; <T extends import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader[] | RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ProcedurePacket").ProcedureCallPacket>(sql: string, values: any): Promise<[T, FieldPacket[]]>; <T extends import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader[] | RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ProcedurePacket").ProcedureCallPacket>(options: import("mysql2/promise").QueryOptions): Promise<[T, FieldPacket[]]>; <T extends import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader[] | RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ProcedurePacket").ProcedureCallPacket>(options: import("mysql2/promise").QueryOptions, values: any): Promise<[T, FieldPacket[]]>; }) {
  throw new Error("Function not implemented.");
}
// describe("test bidon", () => {
//   it("doit me retourner la valeur initiale", () => {
//     expect("jest me saoule").toBe("jest me saoule");
//   });

//   it("doit échouer", () => {
//     const fruits = ["orange", "pear", "apple"];
//     const expectedFruit = "mango";

//     expect(fruits).toContain(expectedFruit);
//   });
// });
