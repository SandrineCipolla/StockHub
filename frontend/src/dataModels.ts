import {Dispatch, SetStateAction} from "react";

export interface Stock {
    id: number;
    label: string;
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
    isLowStock: boolean;
}

export interface Item {
    ID: number;
    LABEL: string;
    DESCRIPTION: string;
    QUANTITY: number;
    STOCK_ID: number;
    PHOTO_URL: string;
    isLowStock: boolean;
}

export interface ItemWithStockLabel extends Item {
    stockLabel: string;
}
export interface StockItemsProps {
    ID: string | undefined;

}

export interface AddStockItemProps {
    stockID: number;
    setStockItems: Dispatch<SetStateAction<StockItem[]>>;
}