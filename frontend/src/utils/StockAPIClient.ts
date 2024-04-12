import {Stock, StockDetail} from "../models.ts";

export const fetchStocksList = async (): Promise<Stock[]> => {
    const response = await fetch('http://localhost:3000/api/v1/stocks', {
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
    const response = await fetch(`http://localhost:3000/api/v1/stocks/${numericID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            credentials: 'include',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP response with a status ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
        return data[0] as StockDetail;
    } else {
        return data as StockDetail;
    }
};

export const updateStockQuantity = async (numericID: number, quantity: number) => {
    const response = await fetch(`http://localhost:3000/api/v1/stocks/${numericID}`, {
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

    const data = await response.json();

    // Mettre à jour stockDetail avec les données récupérées de l'API
    // Vérifier si toutes les données nécessaires sont présentes
    if (data.ID && data.LABEL && data.DESCRIPTION) {
        return {...data, QUANTITY: data.QUANTITY};
    } else {
        return {
            ID: data.ID || undefined,
            LABEL: data.LABEL || undefined,
            DESCRIPTION: data.DESCRIPTION || undefined,
            QUANTITY: data.QUANTITY
        };
    }
};

