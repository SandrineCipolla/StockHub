import {WriteStockRepository} from "../repositories/writeStockRepository";
import {ReadStockRepository} from "../repositories/readStockRepository";
import {Stock, StockToCreate, UpdateStockRequest} from "../models";
import {BadRequestError, ErrorMessages, NotFoundError, ValidationError} from "../errors";
import {StockMapper} from "../stockMapper";

// export class StockService {
//     private writeStockRepository: WriteStockRepository;
//     private readStockRepository: ReadStockRepository;
//     private readonly connection: PoolConnection;
//
//     constructor(connection: PoolConnection) {
//         this.connection = connection;
//         this.writeStockRepository = new WriteStockRepository(connection);
//         this.readStockRepository = new ReadStockRepository(connection);
//     }
//
//     async getAllStocks() {
//         return await this.readStockRepository.readAllStocks();
//     }
//
//     async createStock(stock: Partial<StockToCreate>) {
//         await this.writeStockRepository.createStock(stock);
//     }
//
//     async getStockDetails(ID: number) {
//         return await this.readStockRepository.readStockDetails(ID);
//     }
//
//     async getStockItems(ID: number) {
//         return await this.readStockRepository.readStockItems(ID);
//     }
//
//     async updateStockItemQuantity(updateRequest: UpdateStockRequest) {
//         await this.writeStockRepository.updateStockItemQuantity(updateRequest);
//     }
//
//     async addStockItem(item: Partial<Stock>, stockID: number) {
//         await this.writeStockRepository.addStockItem(item, stockID);
//     }
//
//     async deleteStockItem(stockID: number, itemID: number) {
//         return await this.writeStockRepository.deleteStockItem(stockID, itemID);
//     }
//
//     async getAllItems() {
//         return await this.readStockRepository.readAllItems();
//     }
//
//     async getItemDetails(itemID: number) {
//         return await this.readStockRepository.readItemDetails(itemID);
//     }
// }
export class StockService {
    private writeStockRepository: WriteStockRepository;
    private readStockRepository: ReadStockRepository;

    constructor(
        readStock: ReadStockRepository,
        writeStock: WriteStockRepository
    ) {
        this.readStockRepository = readStock;
        this.writeStockRepository = writeStock;
    }

    async getAllStocks(): Promise<Stock[]> {
        const rows = await this.readStockRepository.readAllStocks();
        console.log('Rows from repository in getAllStocks:', rows);
        if (!rows) {
            throw new Error("No rows returned from readAllStocks");
        }
        const stocks = StockMapper.mapRowDataPacketsToStocks(rows);
        console.log("Mapped Stocks:", stocks);
        return stocks;
    }

    async createStock(stock: Partial<StockToCreate>) {
        if (!stock.LABEL || !stock.DESCRIPTION) {
            throw new BadRequestError("LABEL and DESCRIPTION are required.", ErrorMessages.CreateStock);
        }
        await this.writeStockRepository.createStock(stock);
    }

    async getStockDetails(ID: number) {
        const stock = await this.readStockRepository.readStockDetails(ID);
        if (!stock) {
            throw new NotFoundError("Stock not found.", ErrorMessages.GetStockDetails);
        }
        return stock;
    }

    async getStockItems(ID: number) {
        const items = await this.readStockRepository.readStockItems(ID);
        if (items.length === 0) {
            throw new NotFoundError("No items found for this stock.", ErrorMessages.GetStockItems);
        }
        return items;
    }

    async updateStockItemQuantity(itemID: number, QUANTITY: number, stockID: number) {
        const updateRequest = new UpdateStockRequest(itemID, QUANTITY, stockID);
        await this.writeStockRepository.updateStockItemQuantity(updateRequest);
    }

    async addStockItem(item: Partial<Stock>, stockID: number) {
        if (!item.label || !item.quantity) {
            throw new ValidationError("LABEL and QUANTITY must be provided.", ErrorMessages.AddStockItem);
        }
        await this.writeStockRepository.addStockItem(item, stockID);
    }

    async deleteStockItem(stockID: number, itemID: number) {
        const result = await this.writeStockRepository.deleteStockItem(stockID, itemID);
        if (result.affectedRows === 0) {
            throw new NotFoundError("Item not found or already deleted.", ErrorMessages.DeleteStockItem);
        }
    }

    async getAllItems() {
        return await this.readStockRepository.readAllItems();
    }

    async getItemDetails(itemID: number) {
        const items = await this.readStockRepository.readItemDetails(itemID);
        if (items.length === 0) {
            throw new NotFoundError("Item not found.", ErrorMessages.GetItemDetails);
        }
        return items[0];
    }
}
