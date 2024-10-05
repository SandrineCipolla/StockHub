import {render, screen, waitFor} from '@testing-library/react';
import {vi} from 'vitest';
import StockItems from './../src/components/StockItems';
import {StockItemsContext} from './../src/contexts/StockItemsContext';
import {fetchStockItems} from './../src/utils/StockAPIClient'
import {MemoryRouter} from "react-router-dom";

// Mock de la fonction fetchStockItems
vi.mock('./../src/utils/StockAPIClient', () => ({
    fetchStockItems: vi.fn(),
}));


describe('StockItems component', () => {
    const mockSetStockItems = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks(); // Reset mocks before each test
    });
    describe('when data are uploaded', () => {
        test('should fetch and display stock items', async () => {
            const mockData = [
                {ID: 1, LABEL: 'Item 1', DESCRIPTION: 'Great item', QUANTITY: 10, STOCK_ID: 1},
                {ID: 2, LABEL: 'Item 2', DESCRIPTION: 'Mega item', QUANTITY: 5, STOCK_ID: 1},
            ];
            (fetchStockItems as jest.MockedFunction<typeof fetchStockItems>).mockResolvedValue(mockData);

            render(
                <MemoryRouter>
                    <StockItemsContext.Provider value={{stockItems: mockData, setStockItems: mockSetStockItems}}>
                        <StockItems ID="1"/>
                    </StockItemsContext.Provider>
                </MemoryRouter>
                //permet de faire fonctionner les composants qui utilisent des hooks ou routage comme si ils étaient dans un navigation réelle
            );

            await waitFor(() => {
                expect(fetchStockItems).toHaveBeenCalledWith(1);
                expect(mockSetStockItems).toHaveBeenCalledWith(mockData);
            }, {timeout: 3000});

            expect(screen.getByText('Item 1')).toBeInTheDocument();
            expect(screen.getByText('Item 2')).toBeInTheDocument();
        });

        test('should render detail links correctly', async () => {
            const mockData = [
                {ID: 1, LABEL: 'Item 1', DESCRIPTION: 'Great item', QUANTITY: 10, STOCK_ID: 1},
            ];
            render(
                <MemoryRouter>
                    <StockItemsContext.Provider value={{stockItems: mockData, setStockItems: vi.fn()}}>
                        <StockItems ID="1"/>
                    </StockItemsContext.Provider>
                </MemoryRouter>
            );
            await waitFor(() => {
                const linkElement = screen.getByRole('link');
                expect(linkElement).toHaveAttribute('href', '/stocks/1/items/1');
            });
        })
    })
    describe('when there is an error', () => {
        test('should display loading state when fetching stock items fails', async () => {

            const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
            });
            (fetchStockItems as jest.MockedFunction<typeof fetchStockItems>).mockRejectedValue(new Error('Failed to fetch'));

            render(
                <MemoryRouter>
                    <StockItemsContext.Provider value={{stockItems: [], setStockItems: vi.fn()}}>
                        <StockItems ID="1"/>
                    </StockItemsContext.Provider>
                </MemoryRouter>
            );

            expect(screen.getByText('Loading...')).toBeInTheDocument();

            await waitFor(() => {
                expect(errorSpy).toHaveBeenCalledWith('Error in recovering stock items', expect.any(Error));
            });

            errorSpy.mockRestore();
        });

        test('should handle error when fetching stock items', async () => {
            const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
            });

            (fetchStockItems as jest.MockedFunction<typeof fetchStockItems>).mockRejectedValue(new Error('Failed to fetch'));

            render(
                <MemoryRouter>
                    <StockItemsContext.Provider value={{stockItems: [], setStockItems: vi.fn()}}>
                        <StockItems ID="1"/>
                    </StockItemsContext.Provider>
                </MemoryRouter>
            );

            await waitFor(() => {
                expect(errorSpy).toHaveBeenCalledWith('Error in recovering stock items', expect.any(Error));
            });

            errorSpy.mockRestore();
        });
    })

})

