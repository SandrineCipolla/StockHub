import {jest} from "@jest/globals";

import {Request, Response} from "express";
import {PoolConnection} from "mysql2/promise";

// Mock pour la requête
export function createMockedRequest(): Request {
    return {} as Request;
}

//Mock pour la Fausse Connection à la db
export function createFakeDatabaseConnection(): PoolConnection {
    return {query: jest.fn()} as unknown as PoolConnection;
}


// Mock de la connexion à la base de données (objet qui simule une connexion)
export const mockConnection = {
    query: jest.fn(),
};

// Configuration du mock pour la fonction connectToDatabase
//export const mockConnectToDatabase = jest.fn().mockResolvedValue(mockConnection);

// // Mock pour la réponse
// export function createMockedResponse(): Response {
//   return {
//     status: jest.fn(),
//     json: jest.fn(),
//   } as unknown as Response;
// }

// Mock pour la réponse
/*export function createMockedResponse(): Response {
    let statusCode = 200;
    const mockedResponse: Partial<Response> = {
        status: jest.fn().mockImplementation((code: number) => {
            statusCode = code;
            return mockedResponse as Response;
        }) as any as (code: number) => Response,
        json: jest.fn() as (body: any) => Response,
        get statusCode() {
            return statusCode;
        },
    };
    return mockedResponse as Response;
}*/

export interface MockedResponse extends Response {
    getStatusCode: () => number;
}
export function createMockedResponse(): MockedResponse {
    let statusCode = 200;
    const mockedResponse: Partial<MockedResponse> = {
        status: ((code: number) => {
            statusCode = code;
            return mockedResponse;
        }) as (code: number) => MockedResponse,
        json: jest.fn() as (body: any) => MockedResponse,
        getStatusCode: () => statusCode,
    };
    return mockedResponse as MockedResponse;
}