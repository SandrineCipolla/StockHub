const CONTENT_TYPE = 'Content-Type';
const APPLICATION_JSON = 'application/json';
const CREDENTIALS = 'credentials';
const INCLUDE = 'include';

class ConfigManager {
    static getApiServerUrl() {
        return import.meta.env.VITE_API_SERVER_URL;
    }

    static getFetchConfig() {
        return {
            method: 'GET',
            headers: {
                [CONTENT_TYPE]: APPLICATION_JSON,
                [CREDENTIALS]: INCLUDE,
            },
        };
    }

    static putFetchConfig(body: Record<string, unknown> ) {
        return {
            method: 'PUT',
            headers: {
                [CONTENT_TYPE]: APPLICATION_JSON,
                [CREDENTIALS]: INCLUDE,
            },
            body: JSON.stringify(body),
        };
    }

    static postFetchConfig(body: Record<string, unknown> ) {
        return {
            method: 'POST',
            headers: {
                [CONTENT_TYPE]: APPLICATION_JSON,
                [CREDENTIALS]: INCLUDE,
            },
            body: JSON.stringify(body),
        };
    }


    static deleteFetchConfig(body: Record<string, unknown> ) {
        return {
            method: 'DELETE',
            headers: {
                [CONTENT_TYPE]: APPLICATION_JSON,
                [CREDENTIALS]: INCLUDE,
            },
            body: JSON.stringify(body),
        };
    }

}

export default ConfigManager;