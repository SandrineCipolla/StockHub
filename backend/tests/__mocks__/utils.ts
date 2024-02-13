import { jest } from "@jest/globals";

import { Request, Response } from "express";
import { FieldPacket, OkPacket as ResultSetHeader, ProcedureCallPacket, RowDataPacket, OkPacket, QueryOptions } from "mysql2";
import * as originalConnection from "../../src/db";
import { PoolConnection, Pool } from "mysql2/promise";
import { fakeStocks } from "./mockedData";

// Mock pour la requête
export function createMockedRequest(): Request {
  return {} as Request;
}

//Mock pour la Fake Connection
export function createFakeDatabaseConnection(): PoolConnection {
  return { query: jest.fn() } as unknown as PoolConnection;
}


//Mock ConnectionToData
export const mockConnectionToData = jest.fn();

export const mockConnection = {
  ...originalConnection,
  connectToDatabase: mockConnectionToData,
};

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
    status: jest.fn().mockReturnThis() as ((code: number) => Response),
    json: jest.fn()as ((body: any) => Response),
  };
  return mockedResponse as Response;
}
// export interface QueryMock {
//   (
//     sql: string,
//     callback?: (err: any, results: any, fields: FieldPacket[]) => any
//   ): void;
// }

