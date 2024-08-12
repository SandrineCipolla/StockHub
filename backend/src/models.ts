export interface Stock {
    id: number;
    label: string;
    description: string;
    quantity: number;
}

export interface StockToCreate {
    LABEL: string;
    DESCRIPTION: string;
}

export class UpdateStockRequest {
    itemID: number;
    quantity: number;
    stockID: number;

    constructor(itemID: number, quantity: number, stockID: number) {
        this.itemID = itemID;
        this.quantity = quantity;
        this.stockID = stockID;
    }
}