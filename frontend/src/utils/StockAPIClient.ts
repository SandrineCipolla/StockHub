import {Item, ItemWithStockLabel, Stock, StockDetail, StockItem} from "../dataModels.ts";
import {getApiConfig} from "./utils.ts";


async function putFetch(url: string, body: Record<string, unknown>) {
    const {config} = await getApiConfig('PUT', body);


    const response = await fetch(url, config);

    if (!response.ok) {
        console.error(`Error in PUT request to ${url}`);
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    return await response.json();
}

export const fetchStocksList = async (): Promise<Stock[]> => {
    try {

        const {apiUrl, config} = await getApiConfig();
        console.log("Fetching stocks list with config:", config);

        const response = await fetch(`${apiUrl}/stocks`, config);

        if (!response.ok) {
            console.error('Error in fetching stocks list');
            new Error(`HTTP response with a status ${response.status}`);
        }

        const data = await response.json();
        console.log("Stocks data received:", data);
        return data as Stock[];
    } catch (error) {
        console.error("Error in fetchStocksList:", error);
        throw error;
    }
};

export const fetchStockDetails = async (numericID: number): Promise<StockDetail> => {
    const {apiUrl, config} = await getApiConfig();
    const response = await fetch(`${apiUrl}/stocks/${numericID}`, config);
    console.log('Réponse API:', response);

    if (!response.ok) {
        console.error('Error in fetching stock details');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    const data = await response.json();
    console.log('Données du stock récupérées:', data);

    if (Array.isArray(data)) {
        return data[0] as StockDetail;
    } else {
        console.error('Missing necessary data in the response for fetchStockDetails');
        throw new Error('Missing necessary data in the response for fetchStockDetails');
    }
};

export const fetchStockItems = async (numericID: number): Promise<StockItem[]> => {
    const {apiUrl, config} = await getApiConfig();
    const response = await fetch(`${apiUrl}/stocks/${numericID}/items`, config);

    if (!response.ok) {
        if (response.status === 404) {
            console.warn('Stock not found, returning empty array');
            return [];
        }
        console.error('Error in fetching stock details');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    const data: StockItem[] = await response.json();

    if (Array.isArray(data)) {
        return data.map(item => ({
            ...item,
            isLowStock: item.QUANTITY <=1,
        }));
    } else {
        console.error('Missing necessary data in the response for fetchStockDetails');
        throw new Error('Missing necessary data in the response for fetchStockDetails');
    }
};

export const updateStockItemQuantity = async (stockID: number, itemID: number, quantity: number) => {
    const {apiUrl} = await getApiConfig();
    const body = {QUANTITY: quantity};
    return putFetch(`${apiUrl}/stocks/${stockID}/items/${itemID}`, body);
};

export const addStockItem = async (stockID: number, item: { LABEL: string; DESCRIPTION: string; QUANTITY: number }) => {
    const body = {...item, STOCK_ID: stockID};
    const {apiUrl, config} = await getApiConfig('POST', body);

    const response = await fetch(`${apiUrl}/stocks/${stockID}/items`, config);

    if (!response.ok) {
        console.error('Error in addStockItem');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    return await response.json();
};

export const addStock = async (LABEL: string, DESCRIPTION: string): Promise<Stock> => {
    const body = {LABEL, DESCRIPTION};
    const {apiUrl, config} = await getApiConfig('POST', body);

    console.debug('Sending request with body:', body);

    const response = await fetch(`${apiUrl}/stocks/`, config);

    if (!response.ok) {
        console.error('Error in addStock');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    return await response.json();
};

export const deleteStock = async (stockID: number) => {
   const body = {STOCK: stockID}
    const {apiUrl, config} = await getApiConfig('DELETE', body);
    const response = await fetch(`${apiUrl}/stocks/${stockID}`, config);
    console.log('deleteStock HTTP response status:', response.status);
    if (!response.ok) {
        console.error('Error in deleteStock');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    return await response.json();
};

export const deleteStockItem = async (stockID: number, itemID: number) => {
    const body = {ITEM: itemID}
    const {apiUrl, config} = await getApiConfig('DELETE', body);
    console.log('URL de la requête:', `${apiUrl}/stocks/${stockID}/items/${itemID}`);
    console.log('Corps de la requête:', body);
    console.log('Configuration de la requête:', config);
    const response = await fetch(`${apiUrl}/stocks/${stockID}/items/${itemID}`, config);
    console.log('Réponse du serveur:', response);
    if (!response.ok) {
        console.error('Error in deleteStockItem');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    return await response.json();
};

export const fetchItemsList = async (): Promise<Item[]> => {
    const {apiUrl, config} = await getApiConfig();
    const targetUrl = `${apiUrl}/items`;
    const response = await fetch(targetUrl, config);

    if (!response.ok) {
        console.error('Error in fetching items list. [httpStatus]:${response.status} - [targetUrl] : ${targetUrl}');

        throw new Error(`HTTP response with a status ${response.status}`);
    }

    const data: Item[] = await response.json();

    if (Array.isArray(data)) {
        return data.map(item => ({
            ...item,
            isLowStock: item.QUANTITY <= 1,
        }));
    } else {
        console.error('Missing necessary data in the response for fetchItemsList');
        throw new Error('Missing necessary data in the response for fetchItemsList');
    }
};

export const fetchItemDetails = async (stockID: number, itemID: number): Promise<ItemWithStockLabel> => {
    const {apiUrl, config} = await getApiConfig();
    const response = await fetch(`${apiUrl}/stocks/${stockID}/items/${itemID}`, config);

    if (!response.ok) {
        console.error('Error in fetching item details');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    const data: ItemWithStockLabel = await response.json();
    console.log(data);

    return data as ItemWithStockLabel;

};

export const fetchLowStockItems = async():Promise<Item[]> =>{
    const {apiUrl, config} = await getApiConfig();
    const response = await fetch(`${apiUrl}/low-stock-items`, config);

    if (!response.ok) {
        console.error('Error in fetching low stock items list');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    const data = await response.json();
    console.log('Données récupérées dans fetchLowStockItems:', data);
    return data as Item[];
}


