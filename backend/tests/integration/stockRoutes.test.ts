import request from "supertest";


describe("Stock Routes", () => {
    const HTTP_CODE_OK = 200;
    it("should handle GET /stocks route", async () => {

        const response = await request('http://localhost:3000').get("/api/v1/stocks");

        expect(response.status).toBe(HTTP_CODE_OK);
        expect(response.body).toBeDefined();
    });
});
