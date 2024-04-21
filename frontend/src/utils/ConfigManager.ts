class ConfigManager {
    static getApiServerUrl() {
        return import.meta.env.VITE_API_SERVER_URL || 'http://localhost:3000/api/v1';
    }

    static getFetchConfig() {
        return {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
        };
    }

    static putFetchConfig(body: Record<string, unknown> ) {
        return {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
            body: JSON.stringify(body),
        };
    }

    static postFetchConfig(body: Record<string, unknown> ) {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
            body: JSON.stringify(body),
        };
    }
}

export default ConfigManager;