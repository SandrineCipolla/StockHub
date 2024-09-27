const passportConfig = {
    credentials: {
        tenantName: 'stockhubb2c.onmicrosoft.com',
        clientID: 'dc30ef57-cdc1-4a3e-aac5-9647506a72ef',
    },
    policies: {
        policyName: 'B2C_1_signupsignin',
    },
    metadata: {
        b2cDomain: 'stockhubb2c.b2clogin.com',
        authority: 'login.microsoftonline.com',
        discovery: '.well-known/openid-configuration',
        version: 'v2.0',
    },
    settings: {
        isB2C: true,
        validateIssuer: false,
        passReqToCallback: true,
        loggingLevel: 'info',
        loggingNoPII: false,
    },
    protectedRoutes: {
        stockHubApi: {
            endpoint: '/api/v1',
            delegatedPermissions: {
                read: ['FilesRead'],
                write: ['FilesWrite'],
            },
        },
    },
};

module.exports = passportConfig;
