import authConfig from "./authConfig";
import { rootMain} from "./Utils/logger";
import express from "express";
import {CustomError} from "./errors";
import passport from "passport";
import configureStockRoutes from "./routes/stockRoutes";
import configureUserRoutes from "./routes/userRoutes";
import {app} from "./index";
import {authConfigbearerStrategy} from "./Utils/authBearerStrategy";
import {authenticationMiddleware} from "./Utils/authenticateMiddleware";

export async function initializeApp() {
    const clientID = authConfig.credentials.clientID;
    const audience = authConfig.credentials.clientID;

    if (!clientID || !audience) {
        rootMain.error("clientID or audience is not defined in authConfig");
        throw new Error('clientID or audience is not defined in authConfig');
    }

    const bearerStrategy = authConfigbearerStrategy;

    rootMain.info("initialization of authentication ...");

    app.use(express.json());

    app.use(passport.initialize());

    passport.use(bearerStrategy);

    rootMain.info("initialization of authentication DONE!");

    app.use(
        '/api',
        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            authenticationMiddleware(res, req, next);
        },
        (req: express.Request, res: express.Response, next: express.NextFunction) => {

            next();
        },
        (err: CustomError, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(err.status || 500).send(err);
        }
    );

    const stockRoutes = await configureStockRoutes();
    app.use("/api/v1", stockRoutes);

    const userRoutes = await configureUserRoutes();
    app.use("/api/v1", userRoutes);

    app.get('/hello', (req: express.Request, res: express.Response) => {
        res.status(200).send('Hello World');
    });

    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(404).send("Route not found");
    });

    app.use((err: CustomError, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error(err.stack);
        res.status(500).send("Internal Server Error");
    });

    // might be here tha I'll have to change stuff

    const port = process.env.PORT || 8080;

    app.listen(port, () => {
        rootMain.info(`Backend server running on port ${port}`);
    });
}