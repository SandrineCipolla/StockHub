import { jest } from "@jest/globals";

import { Request, Response } from "express";
import * as originalConnection from "../../src/db";
import { PoolConnection, Pool } from "mysql2/promise";
import { fakeStocks } from "./mockedData";

// Mock pour la requête
export function createMockedRequest(): Request {
  return {} as Request;
}

//Mock pour la Fausse Connection à la db
export function createFakeDatabaseConnection(): PoolConnection {
  return { query: jest.fn() } as unknown as PoolConnection;
}

//Mock ConnectToDatabase
export const mockConnectToDatabase = jest.fn();

// Mock de la connexion à la base de données (objet qui simule une connexion)
export const mockConnection = {
  query: jest.fn(), 
};




// export const mockConnection = {
//   ...originalConnection,
//   connectToDatabase: mockConnectToDatabase,
// };

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
export function createMockedResponse(): Response {
  const mockedResponse: Partial<Response> = {
    status: jest.fn().mockReturnThis() as (code: number) => Response,
    json: jest.fn() as (body: any) => Response,
  };
  return mockedResponse as Response;
}
