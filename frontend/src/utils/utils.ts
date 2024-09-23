import ConfigManager from "./ConfigManager";

export const getToken = (): Promise<string | null> => {
    return new Promise((resolve) => {
        const checkToken = () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                resolve(token);
            } else {
                setTimeout(checkToken, 100);
            }
        };
        checkToken();
    });
};


export async function getApiConfig(method: string = 'GET', body?: Record<string, unknown>) {
    const apiUrl = ConfigManager.getApiServerUrl();
    let config;

    switch (method) {
        case 'PUT':
            config = await ConfigManager.putFetchConfig(body || {});
            break;
        case 'POST':
            config = await ConfigManager.postFetchConfig(body || {});
            break;
        case 'DELETE':
            config = await ConfigManager.deleteFetchConfig(body || {});
            break;
        case 'GET':
        default:
            config = await ConfigManager.getFetchConfig();
            break;
    }

    return { apiUrl, config };
}

