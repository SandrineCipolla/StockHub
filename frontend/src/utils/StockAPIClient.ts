import {Stock, StockDetail} from "../models.ts";
import ConfigManager from "./ConfigManager.ts";

const apiUrl = ConfigManager.getApiServerUrl();

export const fetchStocksList = async (): Promise<Stock[]> => {
    const response = await fetch(`${apiUrl}/stocks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            credentials: 'include',
        },
    });

    if (!response.ok) {
        console.error('Error in fetching stocks list');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    const data = await response.json();
    return data as Stock[];
};

export const fetchStockDetails = async (numericID: number): Promise<StockDetail> => {
    const response = await fetch(`${apiUrl}/stocks/${numericID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            credentials: 'include',
        },
    });

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
    const response = await fetch(`${apiUrl}/stocks/${numericID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            credentials: 'include',
        },
        body: JSON.stringify({QUANTITY: quantity}),
    });

    if (!response.ok) {
        console.error('Error in updating stock quantity');
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    return await response.json()

};

