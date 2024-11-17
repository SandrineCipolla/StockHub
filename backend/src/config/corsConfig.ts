import cors from "cors";

export const corsConfig = {
    credentials: true,
    origin: [
        'http://localhost:5173',
        'http://stockhubappback.azurewebsites.net',
        'https://zealous-bay-022807903.5.azurestaticapps.net',
        'https://localhost:5175',
        'http://localhost:5174']
} as cors.CorsOptions;