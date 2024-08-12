import {Dispatch, SetStateAction} from "react";

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
export interface StockItemsProps {
    ID: string | undefined;

}

export interface AddStockItemProps {
    stockID: number;
    setStockItems: Dispatch<SetStateAction<StockItem[]>>;
}