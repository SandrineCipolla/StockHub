import express from "express";
import cors from "cors";
import {rootMain} from "./Utils/logger";
import {initializeApp} from "./initializeApp";
import {corsConfig} from "./config/corsConfig";

rootMain.info("Starting application ...");

const app = express();

app.use(cors(corsConfig));

const port = process.env.PORT || 8080;


if (process.env.NODE_ENV !== "test") {
    initializeApp();
}

export {app};