import {Request, Response} from "express";
import {StockService} from "../services/stockService";
import {BadRequestError, CustomError, ErrorMessages, sendError, ValidationError} from "../errors";
import {WriteStockRepository} from "../repositories/writeStockRepository";
import {ReadStockRepository} from "../repositories/readStockRepository";
import {HTTP_CODE_CREATED, HTTP_CODE_OK} from "../Utils/httpCodes";
//
//
//
// //TODO voir si + messages d'erreurs selon les situations
// export const getAllStocks = async (req: Request, res: Response, connection: PoolConnection) => {
//     try {
//         const stockService = new StockService(connection);
//         const stocks = await stockService.getAllStocks();
//
//         if (!stocks) {
//             sendError(res, new NotFoundError("Stock not found.", ErrorMessages.GetAllStocks));
//             return;
//         }
//
//         res.status(200).json(stocks);
//     } catch (err: any) {
//         sendError(res, err as CustomError);
//     }
// };
//
// export const createStock = async (req: Request, res: Response, connection: PoolConnection) => {
//     try {
//
//         const {LABEL, DESCRIPTION} = req.body;
//         if (!LABEL || !DESCRIPTION) {
//             sendError(res, new BadRequestError("LABEL and DESCRIPTION are required to create a stock.", ErrorMessages.CreateStock));
//             return;
//         }
//         const stockService = new StockService(connection);
//         await stockService.createStock({LABEL, DESCRIPTION});
//         res.json({message: "Stock created successfully."});
//     } catch (err: any) {
//         sendError(res, err as CustomError);
//     }
// };
//
// export const getStockDetails = async (req: Request, res: Response, connection: PoolConnection, ID: number) => {
//     try {
//         const stockService = new StockService(connection);
//         const stock = await stockService.getStockDetails(ID);
//
//         if (!stock)
//             sendError(res, new NotFoundError("Stock not found.", ErrorMessages.GetStockDetails));
//
//         res.json(stock);
//     } catch (err: any) {
//         sendError(res, err as CustomError);
//     }
// };
//
// export const getStockItems = async (req: Request, res: Response, connection: PoolConnection, ID: number) => {
//     try {
//         const stockService = new StockService(connection);
//         const items = await stockService.getStockItems(ID);
//         if (items.length === 0) {
//             sendError(res, new NotFoundError("Stock not found.", ErrorMessages.GetStockItems));
//             return;
//         }
//         res.json(items);
//     } catch (err: any) {
//         sendError(res, err as CustomError);
//     }
// };
//
// export const updateStockItemQuantity = async (req: Request, res: Response, connection: PoolConnection) => {
//     try {
//         const itemID = Number(req.params.itemID);
//         const {QUANTITY} = req.body;
//         const stockID = Number(req.params.stockID);
//
//         if (!itemID || QUANTITY === undefined)
//             sendError(res, new ValidationError("ID and QUANTITY must be provided.", ErrorMessages.UpdateStockItemQuantity));
//
//         const stockService = new StockService(connection);
//         const updateRequest = new UpdateStockRequest(itemID, QUANTITY, stockID);
//         await stockService.updateStockItemQuantity(updateRequest);
//         res.json({message: "Stock updated successfully."});
//     } catch (err: any) {
//         sendError(res, err as CustomError);
//     }
// };
//
// export const addStockItem = async (req: Request, res: Response, connection: PoolConnection, stockID: number) => {
//     try {
//         const itemUpdated = {
//             id: undefined,
//             label: req.body['LABEL'],
//             description: req.body['DESCRIPTION'],
//             quantity: req.body['QUANTITY']
//         };
//         const stockService = new StockService(connection);
//         await stockService.addStockItem(itemUpdated, stockID);
//         res.status(201).json({message: "Stock item added successfully."});
//     } catch (err: any) {
//         if (err instanceof ValidationError) {
//             sendError(res, err as CustomError);
//         } else {
//             sendError(res, err as CustomError);
//         }
//     }
// };
//
// export const deleteStockItem = async (req: Request, res: Response, connection: PoolConnection, stockID: number, itemID: number) => {
//     try {
//         const stockService = new StockService(connection);
//         const result = await stockService.deleteStockItem(stockID, itemID);
//         if (result.affectedRows === 0)
//             sendError(res, new NotFoundError("Item not found or already deleted.", ErrorMessages.DeleteStockItem));
//         res.status(200).json({message: "Stock item deleted successfully."});
//     } catch (err: any) {
//         sendError(res, err as CustomError);
//     }
// };
//
// export const getAllItems = async (req: Request, res: Response, connection: PoolConnection) => {
//     try {
//         const stockService = new StockService(connection);
//         const items = await stockService.getAllItems();
//         res.status(200).json(items);
//     } catch (err: any) {
//         sendError(res, err as CustomError);
//     }
// };
//
// export const getItemDetails = async (req: Request, res: Response, connection: PoolConnection, itemID: number) => {
//     try {
//         const stockService = new StockService(connection);
//         const items = await stockService.getItemDetails(itemID);
//         if (items.length === 0)
//             sendError(res, new NotFoundError("Item not found.", ErrorMessages.GetItemDetails));
//         res.json(items[0]);
//     } catch (err: any) {
//         sendError(res, err as CustomError);
//     }
// };
export class StockController {
    private stockService: StockService;

    constructor(
        readStock: ReadStockRepository,
        writeStock: WriteStockRepository
    ) {
        this.stockService = new StockService(readStock, writeStock);
    }

   public async getAllStocks(req: Request, res: Response) {
        try {
            const stocks = await this.stockService.getAllStocks();
            res.status(HTTP_CODE_OK).json(stocks);
        } catch (err: any) {
            sendError(res, err as CustomError);
        }
    }

    async createStock(req: Request, res: Response) {
        try {
            const {LABEL, DESCRIPTION} = req.body;
            if (!LABEL || !DESCRIPTION) {
                return sendError(res, new BadRequestError("LABEL and DESCRIPTION are required to create a stock.", ErrorMessages.CreateStock));
            }
            await this.stockService.createStock({LABEL, DESCRIPTION});
            res.status(HTTP_CODE_CREATED).json({message: "Stock created successfully."});
        } catch (err: any) {
            sendError(res, err as CustomError);
        }
    }

    async getStockDetails(req: Request, res: Response) {
        try {
            const ID = Number(req.params.ID);
            const stock = await this.stockService.getStockDetails(ID);
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
