import { PoolConnection, RowDataPacket } from "mysql2/promise";
import {
  createMockedRequest,
  createMockedResponse,
} from "../__mocks__/connectionUtils";
import {
  expectedTableStructure,
  fakeStocks,
  fakeStocksWithoutId,
  newStocks,
} from "../__mocks__/mockedData";
import { getAllStocks } from "../../src/controllers/stockController";
import { Request, Response } from "express";
import { getTableStructure, insertStock } from "../../src/utils/dbUtils";

//Simulation connectToDatabase
jest.mock("../../src/db");

describe("getAllStocks", () => {
  let mockConnection: PoolConnection;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    mockConnection = {
      query: jest.fn(),
    } as unknown as PoolConnection;
    req = createMockedRequest();
    res = createMockedResponse();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("when the table Stock is created", () => {
    const tableName = "stocks";

    it("should return Stocks table with columns ID and Label", async () => {
      (mockConnection.query as jest.Mock).mockResolvedValueOnce([
        expectedTableStructure,
      ]);

      const tableStructure = await getTableStructure(mockConnection, tableName);
      expect(tableStructure).toEqual(expectedTableStructure);
    });
  });

  describe("when all information about stocks are given", () => {
    it("should return stocks with id and label columns", async () => {
      (mockConnection.query as jest.Mock).mockResolvedValueOnce([fakeStocks]);

      await getAllStocks(req, res, mockConnection);

      expect(res.json).toHaveBeenCalledWith(fakeStocks);
    });
  });

  describe("when a new stock is created in an empty stock Table", () => {
    it("should insert a new entry to the empty stock stock table", async () => {
      // // Insertion nouvelle entrée
      // await insertStock(mockConnection, newStocks);
      //
      // // Configuration de la nouvelle entrée
      // (mockConnection.query as jest.Mock).mockResolvedValueOnce([[{id: 1, label: 'MyFirstStock'}]]);
      //
      // // Récupération des données après insertion
      // const query = "SELECT * FROM stocks WHERE label = ?";
      // const rows = (await mockConnection.query(query, ["MyFirstStock"]))[0] as RowDataPacket[];
      //
      // //Vérification  des nouvelles données dans la table
      // expect(rows.length).toBeGreaterThan(0);
      // expect((rows[0] as any).label).toBe("MyFirstStock");
      //---------------------------------------------

      //  Spécification de la valeur avant l'insertion
      (mockConnection.query as jest.Mock).mockResolvedValueOnce([[]]);

      // contenu de la table avant l'insertion
      const initialStocks = await mockConnection.query("SELECT * FROM stocks");
      console.log("Contenu initial de la table :", initialStocks);

      //  nouvelle entrée
      await insertStock(mockConnection, newStocks);

      // Spécification de la valeur retour après l'insertion
      (mockConnection.query as jest.Mock).mockResolvedValueOnce([
        [...newStocks],
      ]);

      //  contenu de la table après l'insertion
      const finalStocks = (await mockConnection.query(
        "SELECT * FROM stocks"
      )) as RowDataPacket[][]; // Use type assertion

      console.log("Table content after insertion:", finalStocks);

      //vérification du contenu de la table après l'insertion
      expect(finalStocks.length).toBeGreaterThan(0);

      expect((finalStocks[0][0] as any).label).toBe("MyNewStock");
    });
  });

  describe("when a new stock is created", () => {
    it("should insert a new entry to the stock table", async () => {
      //  Spécification de la valeur avant l'insertion
      (mockConnection.query as jest.Mock).mockResolvedValueOnce([fakeStocks]);

      // contenu de la table avant l'insertion
      const initialRows = (await mockConnection.query(
        "SELECT * FROM stocks"
      )) as RowDataPacket[][];
      console.log("Contenu initial de la table :", initialRows);
      const initialStocks = initialRows[0];

      // nouvelle entrée
      await insertStock(mockConnection, newStocks);

      // Spécification de la valeur retour après l'insertion
      (mockConnection.query as jest.Mock).mockResolvedValueOnce([
        ...fakeStocks,
        ...newStocks,
      ]);

      // contenu de la table après l'insertion
      const finalStocks = (await mockConnection.query(
        "SELECT * FROM stocks"
      )) as RowDataPacket[][]; // Use type assertion
      console.log("Table content after insertion:", finalStocks);

      // vérification du contenu de la table après l'insertion
      expect(finalStocks.length).toBe(initialStocks.length + 1);
      console.log(initialRows[0]);
      if (finalStocks[3]) {
        expect((finalStocks[3] as any).label).toEqual("MyNewStock");
      }
    });
  });
});

describe("insertStock", () => {
  let mockConnection: PoolConnection;

  beforeEach(() => {
    mockConnection = {
      query: jest.fn(),
    } as unknown as PoolConnection;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("when a new stock is created", () => {
    it("should insert a new entry to the stock table", async () => {
      //  Spécification de la valeur avant l'insertion
      (mockConnection.query as jest.Mock).mockResolvedValueOnce([...fakeStocks]);// ? ou [fakeStocks] ?
     

      // nouvelle entrée
      await insertStock(mockConnection, newStocks);

      // Spécification de la valeur retour après l'insertion
      (mockConnection.query as jest.Mock).mockResolvedValueOnce([
        ...fakeStocks,
        ...newStocks,
      ]);

    
      //  contenu de la table après l'insertion
      const finalStocks = (await mockConnection.query(
        "SELECT * FROM stocks"
      )) as RowDataPacket[][];
      console.log("finalStocks", finalStocks);

      // Vérification que la requête d'insertion a été appelée avec les bonnes valeurs
      expect(mockConnection.query).toHaveBeenCalledWith(
        "INSERT INTO stocks (id, label, description,quantity) VALUES ?",
        [newStocks.map((stock) => [stock.id, stock.label,stock.description, stock.quantity])]
      );
      expect(finalStocks).toEqual([...fakeStocks, ...newStocks]);
    });
  });
});
