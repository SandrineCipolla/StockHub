import { jest } from "@jest/globals";

import { Request, Response } from "express";
import { FieldPacket } from "mysql2";
import * as originalConnection from "../../src/db";
import { PoolConnection } from "mysql2/promise";

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

// Mock pour la réponse
export function createMockedResponse(): Response {
  return {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;
}

export interface QueryMock {
  (
    sql: string,
    callback?: (err: any, results: any, fields: FieldPacket[]) => any
  ): void;
}

