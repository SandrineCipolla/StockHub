import { Request, Response } from "express";
import { getAllStocks } from "../src/controllers/stockController";
import connection from "../src/db";
import { Stock } from "./mockedData";
import { fakeStocks } from "./mockedData";
import { QueryMock, createMockRequest, createMockResponse } from "./mocks";
import {mocked} from 'ts-jest/utils'
import { jest } from '@jest/globals';
import { FieldPacket } from "mysql2";


// Créer un mock pour la méthode query de la connexion DB
//const mockQuery= jest.fn<QueryMock, [string, (((err: any, results: any, fields: FieldPacket[]) => any))?]>();
//const mockQuery = jest.Mock<Query, [string, Function?]>;
const mockQuery = jest.fn<QueryMock, [string, ((err: any, results: any, fields: FieldPacket[]) => any) | undefined]>();



// Ajouter les méthodes spécifiques au mock
mockQuery.mockResolvedValueOnce = jest.fn();
mockQuery.mockRejectedValueOnce = jest.fn();

jest.mock('../src/db', () => ({
    promise: jest.fn(),
    query: jest.fn(),
}));

describe('Stock Controller', () => {
//     it('devrait renvoyer tous les stocks avec statut 200', async () => {    
//     const mockRequest = createMockRequest();
//     const mockResponse = createMockResponse();

// // // Utiliser jest.mocked pour obtenir le mock typé
// // mocked(connection).mockResolvedValueOnce({
// //     query: jest.fn().mockResolvedValueOnce(fakeStocks),
// //   });

//   // Utiliser jest.spyOn pour espionner la méthode promise de la connexion
//   // jest.spyOn(require('../src/db'), 'promise').mockReturnValueOnce({
//   //   query: jest.fn().mockResolvedValueOnce([fakeStocks]),
//   // });
//   // Configurer le comportement du mock
//   mockQuery.mockImplementationOnce(() => Promise.resolve(fakeStocks as unknown as QueryMock));


//     await getAllStocks(mockRequest, mockResponse);

//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.json).toHaveBeenCalledWith(fakeStocks);
//     });


    it("devrait renvoyer une erreur 500 en cas d'erreur de base de données", async () => {
    const mockRequest = {} as Request;
    const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    // Mock de la méthode query de la connexion à la base de données pour générer une erreur
    jest.spyOn(require("../src/db"), "promise").mockReturnValueOnce({
      query: jest
        .fn()
        .mockRejectedValueOnce(new Error("Erreur de base de données")),
    });

    await getAllStocks(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Erreur lors de la requête à la base de données.",
    });
  });
});
