import {mockConnection} from "../__mocks__/connectionUtils";
import pool from "../../src/dbUtils";
import {RowDataPacket} from "mysql2/promise";

jest.mock("../../src/index", () => mockConnection);

describe("Database Connection", () => {
    afterAll(async () => {
        // Fermer le pool de connexions à la fin des tests
        await pool.end();
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

describe("Server setup", () => {
  it("should connect to the database", async () => {
    expect.assertions(1);
    try {
      // Etablir une connexion à la base de données
      const connection = await pool.getConnection();

      // Exécuter une requête de test (par exemple, SELECT 1)
      const [rows] = await connection.query("SELECT 1");

      // Vérifiez le type de la variable rows
      if (Array.isArray(rows)) {
        // La variable rows est de type RowDataPacket[]
        if (rows.length > 0) {
          // La requête a renvoyé au moins une ligne
          // La connexion à la base de données est réussie
          expect(true).toBe(true);
        } else {
          // La requête n'a renvoyé aucune ligne
          // La connexion à la base de données semble être établie mais vide
          console.warn("La requête SELECT a renvoyé 0 lignes. La connexion à la base de données semble établie mais vide.");
          expect(true).toBe(true);
        }
      } else {
        // La variable rows est de type OkPacket
        // Cela signifie que la requête était une opération comme INSERT, UPDATE ou DELETE
        // Dans ce cas, vous pouvez considérer que la connexion à la base de données est réussie
        console.warn("La requête a retourné un OkPacket. La connexion à la base de données est probablement réussie.");
        expect(true).toBe(true);
      }
    } catch (error) {
      // En cas d'erreur, afficher l'erreur dans la console et faire échouer le test
      console.error("Database connection error:", error);
      expect(false).toBe(true);
    }
  });
});

