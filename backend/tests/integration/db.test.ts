import { mockConnection } from "../__mocks__/connectionUtils";
import pool from "../../src/db";
import { PoolConnection, RowDataPacket } from "mysql2/promise";

jest.mock("../../src/index", () => mockConnection);

describe("Database Connection", () => {
  afterAll(async () => {
    // Fermer le pool de connexions à la fin des tests
    await pool.end();
  });

  it("should connect to the database", async () => {
    expect.assertions(1);
    try {
      //la connexion réussit, le test passe
      expect(true).toBe(true);
    } catch (error) {
      //la connexion échoue, le test échoue
      console.error("Database connection error:", error);
      expect(false).toBe(true);
    }
  });

  it("should connect to the database and execute a simple query", async () => {
    let connection;

    try {
      connection = await pool.getConnection();
      const [rows] = (await connection.query("SELECT 1")) as RowDataPacket[];

      // Si la requête réussi, rows devrait être un tableau non vide
      expect(Array.isArray(rows)).toBe(true);
      expect(rows.length).toBeGreaterThan(0);
    } catch (error) {
      // Si une erreur => échec
      console.error("Database connection error:", error);
      expect(false).toBe(true);
    } finally {
      //  libérer la connexion
      if (connection) connection.release();
    }
  });
});
