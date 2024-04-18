import {Stock, StockDetail} from "../models.ts";
import ConfigManager from "./ConfigManager.ts";

const apiUrl = ConfigManager.getApiServerUrl();
const getConfig:RequestInit = ConfigManager.getFetchConfig();

async function putFetch(url: string, body: Record<string, unknown>) {
    const putConfig = ConfigManager.putFetchConfig(body);
    const response = await fetch(url, putConfig);

    if (!response.ok) {
        console.error(`Error in PUT request to ${url}`);
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    return await response.json();
}

export const fetchStocksList = async (): Promise<Stock[]> => {
    const response = await fetch(`${apiUrl}/stocks`,getConfig);

    if (!response.ok) {
        console.error('Error in fetching stocks list');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    const data = await response.json();
    return data as Stock[];
};

export const fetchStockDetails = async (numericID: number): Promise<StockDetail> => {
    const response = await fetch(`${apiUrl}/stocks/${numericID}`, getConfig);

    if (!response.ok) {
        console.error('Error in fetching stock details');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
        return data[0] as StockDetail;
    } else {
        console.error('Missing necessary data in the response for fetchStockDetails');
        throw new Error('Missing necessary data in the response for fetchStockDetails');
    }
};

export const updateStockQuantity = async (numericID: number, quantity: number) => {
    const body = {QUANTITY: quantity};
    return putFetch(`${apiUrl}/stocks/${numericID}`, body);
};


