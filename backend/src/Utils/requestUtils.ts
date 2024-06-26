import { Request } from 'express';
import {Stock} from "../models";


export const extractDataFromRequestBody = (req: Request, keys: string[]) => {
    const data: Partial<Stock> = {};
    keys.forEach(key => {
        data[key as keyof Stock] = req.body[key];
    });
    return data;
};