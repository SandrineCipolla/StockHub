import {Dispatch, SetStateAction} from "react";
import {StockItem} from "./dataModels.ts";

export interface StockItemsProps {
    ID: string | undefined;

}

export interface AddStockItemProps {
    stockID: number;
    setStockItems: Dispatch<SetStateAction<StockItem[]>>;
}