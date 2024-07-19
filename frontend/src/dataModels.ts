export interface Stock {
    ID: number;
    LABEL: string;
}

export interface StockDetail {
    ID: number;
    LABEL: string;
    DESCRIPTION: string;
}

export interface StockItem {
    ID: number;
    LABEL: string;
    DESCRIPTION: string;
    QUANTITY: number;
    STOCK_ID: number;
}

export interface Item {
    ID: number;
    LABEL: string;
    DESCRIPTION: string;
    QUANTITY: number;
    STOCK_ID: number;
    PHOTO_URL: string;
}