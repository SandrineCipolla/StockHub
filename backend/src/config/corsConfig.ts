import cors from "cors";
import {rootSecurity} from "../Utils/logger";

const allowedOrigins =[
    'http://localhost:5173',
    'http://stockhubappback.azurewebsites.net',
    'https://zealous-bay-022807903.5.azurestaticapps.net',
    'https://localhost:5175',
    'http://localhost:5174'];

export const corsConfig = {
    credentials: true,
    origin: [
        'http://localhost:5173',
        'http://stockhubappback.azurewebsites.net',
        'https://zealous-bay-022807903.5.azurestaticapps.net',
        'https://localhost:5175',
        'http://localhost:5174']
} as cors.CorsOptions;

rootSecurity.info("CORS configuration allowed origins:");

allowedOrigins.forEach((current) => {
    rootSecurity.info(` - ${current}`);
});