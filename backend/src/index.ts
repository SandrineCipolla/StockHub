import express from "express";
import cors from "cors";
import {rootMain} from "./Utils/logger";
import {initializeApp} from "./initializeApp";

rootMain.info("Starting application ...");

// dotenv.config();

const app = express();

const corsOptions = {
    credentials: true,
    origin: [
        'http://localhost:5173',
        'http://stockhubappback.azurewebsites.net',
        'https://zealous-bay-022807903.5.azurestaticapps.net',
        'https://localhost:5175',
        'http://localhost:5174']
};

app.use(cors(corsOptions));

const port = process.env.PORT || 8080;


if (process.env.NODE_ENV !== "test") {
    initializeApp();
}

export {app};