import request from "supertest";
import { app, initializeApp } from "../../src";
import dotenv from "dotenv";
import * as path from "node:path";
import {HTTP_CODE_OK} from "../../src/Utils/httpCodes";

// Load environment variables from a specific .env file
// dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

describe("Stock Routes", () => {


    beforeAll(async () => {
        await initializeApp();
    });

    it("should handle GET /stocks route", async () => {
        const response = await request(app).get("/api/v1/stocks");

        expect(response.status).toBe(HTTP_CODE_OK);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);

        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty('description');
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('label');
        }
    });
});

