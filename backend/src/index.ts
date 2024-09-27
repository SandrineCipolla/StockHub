import express from "express";
import cors from "cors";
import configureStockRoutes from "./routes/stockRoutes";
import dotenv from "dotenv";
import passport from "passport";
import passportAzureAd from "passport-azure-ad";
import authConfig from './authConfig';
import {CustomError} from "./errors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

let isDatabaseConnected: boolean = false;

export async function initializeApp() {
    const clientID = authConfig.credentials.clientID;
    const audience = authConfig.credentials.clientID;

    if (!clientID || !audience) {
        throw new Error('clientID or audience is not defined in authConfig');
    }
    const options = {
        identityMetadata: `https://${authConfig.metadata.b2cDomain}/${authConfig.credentials.tenantName}/${authConfig.policies.policyName}/${authConfig.metadata.version}/${authConfig.metadata.discovery}`,
        clientID: clientID,
        audience: audience,
        policyName: authConfig.policies.policyName,
        isB2C: authConfig.settings.isB2C,
        validateIssuer: authConfig.settings.validateIssuer,
        loggingLevel: authConfig.settings.loggingLevel,
        passReqToCallback: authConfig.settings.passReqToCallback,
        loggingNoPII: authConfig.settings.loggingNoPII,
    };

    const bearerStrategy = new passportAzureAd.BearerStrategy(options, (req: express.Request, token: any, done: (err: CustomError | null, user?: any, info?: any) => void) => {
        console.log("Token received:", token);
        if (!token.hasOwnProperty('scp')) {
            return done(new Error('Unauthorized'), null, 'No delegated permissions found');
        }
        console.log("Token is valid, proceeding with authentication");
        done(null, {}, token);
    });

    try {
        isDatabaseConnected = true;
        console.log("Connection to database successful");
    } catch (error) {
        console.error("Error connecting to the database :", error);
        process.exit(1);
    }

    app.use(cors());
    app.use(express.json());
    app.use(passport.initialize());
    passport.use(bearerStrategy);

    app.use(
        '/api',
        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            passport.authenticate(
                'oauth-bearer',
                { session: false },
                (err: CustomError, user: any, info: any) => {
                    if (err) {
                        console.error("Authentication error:", err.message);
                        return res.status(401).json({ error: err.message });
                    }
                    if (!user) {
                        console.error("User not authenticated");
                        return res.status(401).json({ error: 'Unauthorized' });
                    }
                    if (info) {
                        (req as any).authInfo = info;
                        console.log("Authentication successful, proceeding to next middleware");
                        return next();
                    }
                }
            )(req, res, next);
        },
        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            // Define your router here or import it
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

    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(404).send("Route not found");
    });

    app.use((err: CustomError, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error(err.stack);
        res.status(500).send("Internal Server Error");
    });

    app.listen(port, () => {
        console.info(`Backend server running on port ${port}`);
    });
}

if (process.env.NODE_ENV !== "test") {
    initializeApp();
}

export { app };