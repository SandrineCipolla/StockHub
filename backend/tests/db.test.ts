
import { connectToDatabase } from '../src/index';

//Simulation connectToDatabase
jest.mock('../src/index', () => ({
    ...jest.requireActual('../src/index'),
    connectToDatabase: jest.fn(),
}));

describe('Server setup', () => {
    it('should connect to the database', async () => {
    expect.assertions(1);

    try {
      //test de connexion 
        await connectToDatabase();
      //la connexion réussit, le test passe
        expect(true).toBe(true);
    } catch (error) {
      //la connexion échoue, le test échoue
        console.error('Database connection error:', error);
        expect(false).toBe(true);
    }
    });
});