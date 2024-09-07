import request from "supertest";
import {initializeApp} from "../../src";


describe("Stock Routes", () => {
    const HTTP_CODE_OK = 200;


    beforeAll(async () => {

        await initializeApp();
    });

    it("should handle GET /stocks route", async () => {
        const response = await request(`http://localhost:3000}`).get("/api/v1/stocks");

        expect(response.status).toBe(HTTP_CODE_OK);
        expect(response.body).toBeDefined();
    });
});