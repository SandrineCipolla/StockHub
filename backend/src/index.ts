import express from "express";
import cors from "cors";
import {rootMain} from "./Utils/logger";
import {initializeApp} from "./initializeApp";
import {corsConfig} from "./config/corsConfig";
import {selectedRuntimeMode} from "./config/runtimeMode";

rootMain.info("Starting application ...");
rootMain.info("selected runtime mode is {selectedRuntimeMode}", selectedRuntimeMode);

const app = express();

app.use(cors(corsConfig));

if (process.env.NODE_ENV !== "test") {
   initializeApp(app);
}

export {app};