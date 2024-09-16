import { Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
    auth: {
        clientId: "0dc4acfb-ecde-4f9b-81eb-9af050fb52d9",
        authority: "https://stockhub.b2clogin.com/stockhub.onmicrosoft.com/b2c_1_signupsignin",
        redirectUri: "http://localhost:3000", // L'URI de redirection après la connexion
    },
    cache: {
        cacheLocation: "sessionStorage",// bdd? pas geré par msal
        storeAuthStateInCookie: false, // Si Internet Explorer
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        break;
                    case LogLevel.Info:
                        console.info(message);
                        break;
                    case LogLevel.Verbose:
                        console.debug(message);
                        break;
                    case LogLevel.Warning:
                        console.warn(message);
                        break;
                }
            },
        },
    },
};

export const loginRequest = {
    scopes: ["openid", "profile", "User.Read"],
};
