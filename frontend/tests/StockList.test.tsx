import {render, screen, waitFor} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import StocksList from '../src/components/StocksList';
import {fetchStocksList} from '../src/utils/StockAPIClient';
import {vi} from 'vitest';
import {act} from "react-dom/test-utils";

// Mock the fetchStocksList function
vi.mock('../src/utils/StockAPIClient', () => ({
    fetchStocksList: vi.fn(),
}));

const mockedFetchStocksList = fetchStocksList as jest.MockedFunction<typeof fetchStocksList>;

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate, // Mock de useNavigate
    };
});

describe('StocksList Component', () => {
    beforeEach(() => {
        mockedFetchStocksList.mockResolvedValue([
            {id: 1, label: 'Stock 1'},
            {id: 2, label: 'Stock 2'},
        ]);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('renders the list of stocks', async () => {
        await act(async () => { // pour mise à jour des composants
            render(
                <BrowserRouter>
                    <StocksList/>
                </BrowserRouter>
            );
        });

        // Log the HTML output to inspect it
        //screen.debug();

        await waitFor(() => {
            expect(screen.getByText('Liste des stocks')).toBeInTheDocument();
            expect(screen.getByText('Stock 1')).toBeInTheDocument();
            expect(screen.getByText('Stock 2')).toBeInTheDocument();
        });
    });

    test('navigates to home on button click', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <StocksList/>
                </BrowserRouter>
            );
        });

        const button = screen.getByText("Retour à l'accueil");
        expect(button).toBeInTheDocument();

        await act(async () => {
            button.click();
        });
        // Vérifie que la fonction de navigation a été appelée
        expect(mockNavigate).toHaveBeenCalledWith('/home');
    });

});

