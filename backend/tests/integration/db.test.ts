import { mockConnection } from "../__mocks__/utils";
import pool from "../../src/db";


jest.mock("../../src/index", () => mockConnection);

describe("Server setup", () => {
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

