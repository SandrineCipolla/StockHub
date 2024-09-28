import {RowDataPacket} from "mysql2/promise";

export interface CustomRowDataPacket extends RowDataPacket {
    ID: number;
    LABEL: string;
    DESCRIPTION: string;
    QUANTITY: number;
}

export class Stock  {
    id: number;
    label: string;
    description: string;
    quantity: number;
    userID: number;

    constructor(id: number, label: string, description: string, quantity: number,userID: number) {
        this.id = id;
        this.label = label;
        this.description = description;
        this.quantity = quantity;
        this.userID= userID;
    }

}

export interface StockToCreate {
    LABEL: string;
    DESCRIPTION: string;
    USER_ID: number;
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