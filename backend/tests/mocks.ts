import { jest } from '@jest/globals';

import { Request, Response } from 'express';
import { Query, FieldPacket } from 'mysql2';

// Mock pour la requête Express
export const createMockRequest = (): Request => {
  
  return {} as Request;
};

// Mock pour la réponse Express
export const createMockResponse = (): Response => {
  // Implémentez la création d'une réponse mock selon vos besoins
  return {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  } as unknown as Response;
};

// Définir le type QueryMock
//export type QueryMock = jest.Mock<Query, [string, (((err: any, results: any, fields: FieldPacket[]) => any) | undefined)?]>//;

//export type QueryMock = jest.Mock<Query, [string, Function?]>;

export interface QueryMock {
  (sql: string, callback?: (err: any, results: any, fields: FieldPacket[]) => any): void;
}

const mockQuery: QueryMock = jest.fn();
