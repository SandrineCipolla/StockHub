import fs from 'fs'
import https from 'https'
import express from "express";
import {HttpsPort} from "../config/httpPortConfiguration";
import {rootServerSetup} from "../Utils/logger";
import cors from "cors";
import {corsConfig} from "../config/corsConfig";

const serverKeyPath = '/etc/ssl/private/selfsigned.key'
const serverCertPath = '/etc/ssl/certs/selfsigned.crt'

rootServerSetup.info('certificate key path {serverKeyPath}', serverKeyPath);
rootServerSetup.info('certificate key path {serverCertPath}', serverCertPath);

rootServerSetup.info('Setup HTTPS Server {httpsPort}', HttpsPort);

export function startHttpsServer(app: express.Application) {
    app.use(cors(corsConfig));

    rootServerSetup.info("HTTPS server CORS allowed origins:");

    const options = {
        key: fs.readFileSync(serverKeyPath),
        cert: fs.readFileSync(serverCertPath),

    };

    const httpsServer = https.createServer(options, app);

    rootServerSetup.info("HTTPS server created.");

    httpsServer.listen(HttpsPort, () => {
        rootServerSetup.info('HTTPS Server running on port {HttpsPort}', HttpsPort);
    });
}
