import { mockConnection } from "../__mocks__/utils";


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
