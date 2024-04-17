class ConfigManager {
    static getApiServerUrl() {
        return import.meta.env.VITE_API_SERVER_URL || 'http://localhost:3000/api/v1';
    }
}

export default ConfigManager;