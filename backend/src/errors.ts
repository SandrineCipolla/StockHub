import {Response} from "express";

export class ValidationError extends Error {
    constructor(message: string, public data?: any) {
        super(message);
        this.name = 'ValidationError';
    }
}

export enum ErrorMessages {
    UpdateStockItemQuantity = "Error while updating the stock item quantity:",
    AddStockItem = "Error while adding a new stock item:",
    DeleteStockItem = "Error while deleting the stock item from the database:",
    GetAllStocks = "Error while retrieving all stocks:",
    CreateStock = "Error while creating a new stock:",
    GetStockDetails = "Error while retrieving the stock details:",
    GetStockItems = "Error while retrieving the items of the stock:",
    GetItemDetails = "Error while retrieving the item details:",
    GetAllItems = "Error while retrieving all items:"
}

export const sendError = (res: Response, errorMessage: ErrorMessages, err: any) => {
    console.error(errorMessage, err);
    res.status(500).json({error: errorMessage});
};