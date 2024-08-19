import {WriteStockRepository} from "../repositories/writeStockRepository";
import {ReadStockRepository} from "../repositories/readStockRepository";
import {PoolConnection} from "mysql2/promise";
import {Stock, StockToCreate, UpdateStockRequest} from "../models";

export class StockService {
    private writeStockRepository: WriteStockRepository;
    private readStockRepository: ReadStockRepository;
    private readonly connection: PoolConnection;

    constructor(connection: PoolConnection) {
        this.connection = connection;
        this.writeStockRepository = new WriteStockRepository(connection);
        this.readStockRepository = new ReadStockRepository(connection);
    }

    async getAllStocks() {
        return await this.readStockRepository.readAllStocks();
    }

    async createStock(stock: Partial<StockToCreate>) {
        await this.writeStockRepository.createStock(stock);
    }

    async getStockDetails(ID: number) {
        return await this.readStockRepository.readStockDetails(ID);
    }

    async getStockItems(ID: number) {
        return await this.readStockRepository.readStockItems(ID);
    }

    async updateStockItemQuantity(updateRequest: UpdateStockRequest) {
        await this.writeStockRepository.updateStockItemQuantity(updateRequest);
    }

    async addStockItem(item: Partial<Stock>, stockID: number) {
        await this.writeStockRepository.addStockItem(item, stockID);
    }

    async deleteStockItem(stockID: number, itemID: number) {
        return await this.writeStockRepository.deleteStockItem(stockID, itemID);
    }

    async getAllItems() {
        return await this.readStockRepository.readAllItems();
    }

    async getItemDetails(itemID: number) {
        return await this.readStockRepository.readItemDetails(itemID);
    }
}