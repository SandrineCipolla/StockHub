import {Response} from "express";

export class ValidationError extends Error {
    constructor(message: string, public data?: any) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class DatabaseError extends Error {
    constructor(message: string, public originalError?: any) {
        super(message);
        this.name = 'DatabaseError';
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadRequestError';
    }
}

export class ConflictError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ConflictError';
    }
}

export enum ErrorMessages {
    ValidationError = "Validation error occurred:",
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

    if (err instanceof ValidationError) {
        res.status(400).json({error: err.message, details: err.data});
    } else if (err instanceof BadRequestError) {
        res.status(400).json({error: err.message});
    } else if (err instanceof NotFoundError) {
        res.status(404).json({error: err.message});
    } else if (err instanceof ConflictError) {
        res.status(409).json({error: err.message});
    } else if (err instanceof DatabaseError) {
        res.status(500).json({error: "A database error occurred. Please try again later."});
    } else {
        res.status(500).json({error: "An unexpected error occurred. Please try again later."});
    }
};