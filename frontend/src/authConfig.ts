import { Configuration, LogLevel } from '@azure/msal-browser';

export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_signupsignin',
        // forgotPassword: 'B2C_1_reset_v3',
        // editProfile: 'B2C_1_edit_profile_v2',
    },
    authorities: {
        signUpSignIn: {
           authority: 'https://stockhubb2c.b2clogin.com/stockhubb2c.onmicrosoft.com/B2C_1_signupsignin',
            //authority: "https://stockhubb2c.b2clogin.com/tfp/2b9bbbf5-4706-4eed-86a7-d55a5094b647/B2C_1_signupsignin",
        },
        // forgotPassword: {
        //     authority: 'https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/B2C_1_reset_v3',
        // },
        // editProfile: {
        //     authority: 'https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_edit_profile_v2',
        // },
    },
    authorityDomain: 'stockhubb2c.b2clogin.com',
};

export const msalConfig: Configuration = {
    auth: {
        clientId: "0dc4acfb-ecde-4f9b-81eb-9af050fb52d9",
       // authority: "https://stockhubb2c.b2clogin.com/tfp/2b9bbbf5-4706-4eed-86a7-d55a5094b647/B2C_1_signupsignin",
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: import.meta.env.VITE_REDIRECT_URI, // L'URI de redirection après la connexion
    },
    cache: {
        cacheLocation: "localStorage",
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

export const protectedResources = {
    stockHubApi: {
        endpoint: import.meta.env.VITE_API_SERVER_URL,
        scopes: {
            read: ['https://stockhubb2c.onmicrosoft.com/dc30ef57-cdc1-4a3e-aac5-9647506a72ef/FilesRead'],
            write: ['https://stockhubb2c.onmicrosoft.com/dc30ef57-cdc1-4a3e-aac5-9647506a72ef/FilesWrite'],
        },
    },
};

export const loginRequest = {
    scopes: [...protectedResources.stockHubApi.scopes.read, ...protectedResources.stockHubApi.scopes.write],
};
