import {Request, Response} from "express";
import {StockService} from "../services/stockService";
import {BadRequestError, CustomError, ErrorMessages, sendError, ValidationError} from "../errors";
import {WriteStockRepository} from "../repositories/writeStockRepository";
import {ReadStockRepository} from "../repositories/readStockRepository";
import {HTTP_CODE_CREATED, HTTP_CODE_OK} from "../Utils/httpCodes";
import {UserService} from "../services/userService";
import {ReadUserRepository} from "../services/readUserRepository";
//
//
//
// //TODO voir si + messages d'erreurs selon les situations


export class StockController {
    private stockService: StockService;
    private userService: UserService;

    constructor(
        readStock: ReadStockRepository,
        writeStock: WriteStockRepository,
        readUser: ReadUserRepository,
    ) {
        this.stockService = new StockService(readStock, writeStock);
        this.userService = new UserService(readUser);
    }

    public async getAllStocks(req: Request, res: Response) {
        try {

            const OID = (req as any).userID as string;
            const userID = await this.userService.convertOIDtoUserID(OID);
            const stocks = await this.stockService.getAllStocks(userID);
            res.status(HTTP_CODE_OK).json(stocks);
        } catch (err: any) {
            sendError(res, err as CustomError);
        }
    }

    async createStock(req: Request, res: Response) {
        try {
            const OID = (req as any).userID as string;
            const userID = await this.userService.convertOIDtoUserID(OID);
            const {LABEL, DESCRIPTION} = req.body;
            if (!LABEL || !DESCRIPTION) {
                return sendError(res, new BadRequestError("LABEL and DESCRIPTION are required to create a stock.", ErrorMessages.CreateStock));
            }
            await this.stockService.createStock({LABEL, DESCRIPTION}, userID);
            res.status(HTTP_CODE_CREATED).json({message: "Stock created successfully."});
        } catch (err: any) {
            sendError(res, err as CustomError);
        }
    }

    async getStockDetails(req: Request, res: Response) {
        try {
            const OID = (req as any).userID as string;
            const userID = await this.userService.convertOIDtoUserID(OID);
            const ID = Number(req.params.ID);
            const stock = await this.stockService.getStockDetails(ID, userID);
            res.status(HTTP_CODE_OK).json(stock);
        } catch (err: any) {
            sendError(res, err as CustomError);
        }
    }

    async getStockItems(req: Request, res: Response) {
        try {
            const ID = Number(req.params.ID);
            const items = await this.stockService.getStockItems(ID);
            res.status(HTTP_CODE_OK).json(items);
        } catch (err: any) {
            sendError(res, err as CustomError);
        }
    }

    async updateStockItemQuantity(req: Request, res: Response) {
        try {
            const itemID = Number(req.params.itemID);
            const stockID = Number(req.params.stockID);
            const {QUANTITY} = req.body;

            if (!itemID || QUANTITY === undefined) {
                return sendError(res, new ValidationError("ID and QUANTITY must be provided.", ErrorMessages.UpdateStockItemQuantity));
            }

            await this.stockService.updateStockItemQuantity(itemID, QUANTITY, stockID);
            res.status(HTTP_CODE_OK).json({message: "Stock updated successfully."});
        } catch (err: any) {
            sendError(res, err as CustomError);
        }
    }

    async addStockItem(req: Request, res: Response) {
        try {
            const stockID = Number(req.params.stockID);
            const item = {
                label: req.body['LABEL'],
                description: req.body['DESCRIPTION'],
                quantity: req.body['QUANTITY']
            };
            await this.stockService.addStockItem(item, stockID);
            res.status(HTTP_CODE_CREATED).json({message: "Stock item added successfully."});
        } catch (err: any) {
            sendError(res, err as CustomError);
        }
    }

    async deleteStockItem(req: Request, res: Response) {
        try {
            const stockID = Number(req.params.stockID);
            const itemID = Number(req.params.itemID);
            await this.stockService.deleteStockItem(stockID, itemID);
            res.status(HTTP_CODE_OK).json({message: "Stock item deleted successfully."});
        } catch (err: any) {
            sendError(res, err as CustomError);
        }
    }

    async getAllItems(req: Request, res: Response) {
        try {
            const items = await this.stockService.getAllItems();
            res.status(HTTP_CODE_OK).json(items);
        } catch (err: any) {
            sendError(res, err as CustomError);
        }
    }

    async getItemDetails(req: Request, res: Response) {
        try {
            const itemID = Number(req.params.itemID);
            const item = await this.stockService.getItemDetails(itemID);
            res.status(HTTP_CODE_OK).json(item);
        } catch (err: any) {
            sendError(res, err as CustomError);
        }
    }
}
