
const CONTENT_TYPE = 'Content-Type';
const APPLICATION_JSON = 'application/json';
const CREDENTIALS = 'credentials';
const INCLUDE = 'include';
const AUTHORIZATION = 'Authorization';

const getToken = (): Promise<string | null> => {
    return new Promise((resolve) => {
        const checkToken = () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                console.log("Token found:", token);
                resolve(token);
            } else {
                console.log("Token not found, retrying...");
                setTimeout(checkToken, 100); // Réessayer après 100ms
            }
        };
        checkToken();
    });
};

class ConfigManager {
    static getApiServerUrl() {
        return import.meta.env.VITE_API_SERVER_URL;
    }

    static async getFetchConfig() {
        const token = await getToken();
        return {
            method: 'GET',
            headers: {
                [AUTHORIZATION]: `Bearer ${token}`,
                [CONTENT_TYPE]: APPLICATION_JSON,
                [CREDENTIALS]: INCLUDE,
            },
        };
    }

    static async putFetchConfig(body: Record<string, unknown>) {
        const token = await getToken();
        return {
            method: 'PUT',
            headers: {
                [AUTHORIZATION]: `Bearer ${token}`,
                [CONTENT_TYPE]: APPLICATION_JSON,
                [CREDENTIALS]: INCLUDE,
            },
            body: JSON.stringify(body),
        };
    }

    static async postFetchConfig(body: Record<string, unknown>) {
        const token = await getToken();
        return {
            method: 'POST',
            headers: {
                [AUTHORIZATION]: `Bearer ${token}`,
                [CONTENT_TYPE]: APPLICATION_JSON,
                [CREDENTIALS]: INCLUDE,
            },
            body: JSON.stringify(body),
        };
    }

    static async deleteFetchConfig(body: Record<string, unknown>) {
        const token = await getToken();
        return {
            method: 'DELETE',
            headers: {
                [AUTHORIZATION]: `Bearer ${token}`,
                [CONTENT_TYPE]: APPLICATION_JSON,
                [CREDENTIALS]: INCLUDE,
            },
            body: JSON.stringify(body),
        };
    }
}

export default ConfigManager;