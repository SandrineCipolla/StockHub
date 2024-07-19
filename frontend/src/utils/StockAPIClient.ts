import {Item, Stock, StockDetail, StockItem} from "../dataModels.ts";
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

export const fetchStockItems = async (numericID: number): Promise<StockItem[]> => {
    const response = await fetch(`${apiUrl}/stocks/${numericID}/items`, getConfig);

    if (!response.ok) {
        console.error('Error in fetching stock details');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    const data:StockItem[] = await response.json();

    if (Array.isArray(data)) {
        return data
    } else {
        console.error('Missing necessary data in the response for fetchStockDetails');
        throw new Error('Missing necessary data in the response for fetchStockDetails');
    }
};

export const updateStockItemQuantity = async (stockID:number,itemID:number, quantity: number) => {
    const body = {QUANTITY: quantity};
    return putFetch(`${apiUrl}/stocks/${stockID}/items/${itemID}`, body);
};

export const addStockItem = async (stockID: number, item: { LABEL: string; DESCRIPTION: string; QUANTITY: number }) => {
    const body = { ...item, STOCK_ID: stockID };
    console.debug('Sending request with body:', body);
    const postConfig = ConfigManager.postFetchConfig(body);
    const response = await fetch(`${apiUrl}/stocks/${stockID}/items`, postConfig);

    if (!response.ok) {
        console.error('Error in addStockItem');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    return await response.json();
};

export const deleteStockItem = async (stockID: number, itemID: number) => {
    const body = {ITEM : itemID}
    const deleteConfig = ConfigManager.deleteFetchConfig(body);
    const response = await fetch(`${apiUrl}/stocks/${stockID}/items/${itemID}`, deleteConfig);

    if (!response.ok) {
        console.error('Error in deleteStockItem');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    return await response.json();
};

export const fetchItemsList = async (): Promise<Item[]> => {
    const response = await fetch(`${apiUrl}/items`,getConfig);

    if (!response.ok) {
        console.error('Error in fetching items list');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    const data = await response.json();
    return data as Item[];
};


