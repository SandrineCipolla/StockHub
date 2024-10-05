import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {vi} from 'vitest';
import AddStockItem from "./../src/components/AddStockItem";
import {StockItemsContext} from './../src/contexts/StockItemsContext';
import {MemoryRouter} from "react-router-dom";
import {addStockItem, fetchStockItems} from "../src/utils/StockAPIClient";


vi.mock('./../src/utils/StockAPIClient', () => ({
    addStockItem: vi.fn(),
    fetchStockItems: vi.fn(),
}));


describe('AddStockItem component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    describe('when the user wants to add an item', () => {

        test(' it should show and hide the form when clicking the "+" button and "X" button', () => {
            render(
                <MemoryRouter>
                    <StockItemsContext.Provider value={{ stockItems: [],setStockItems: vi.fn()}}>
                        <AddStockItem stockID={1}/>
                    </StockItemsContext.Provider>
                </MemoryRouter>
            );

            // Vérifiez que le formulaire n'est pas affiché au départ
            expect(screen.queryByText('Add Item')).toBeNull();

            // Ouvrir le formulaire
            fireEvent.click(screen.getByText('+'));
            expect(screen.getByText('Add Item')).toBeInTheDocument();

            // Fermer le formulaire en cliquant sur la croix "X"
            fireEvent.click(screen.getByText('X'));
            expect(screen.queryByText('Add Item')).toBeNull();
        });

        test('it should update input fields correctly', () => {
            render(
                <MemoryRouter>
                    <StockItemsContext.Provider value={{ stockItems: [],setStockItems: vi.fn()}}>
                        <AddStockItem stockID={1}/>
                    </StockItemsContext.Provider>
                </MemoryRouter>
            );

            fireEvent.click(screen.getByText('+'));

            fireEvent.change(screen.getByPlaceholderText('Label'), {target: {value: 'New Label'}});
            fireEvent.change(screen.getByPlaceholderText('Description'), {target: {value: 'New Description'}});
            fireEvent.change(screen.getByPlaceholderText('Quantity'), {target: {value: '5'}});

            expect(screen.getByPlaceholderText('Label')).toHaveValue('New Label');
            expect(screen.getByPlaceholderText('Description')).toHaveValue('New Description');
            expect(screen.getByPlaceholderText('Quantity')).toHaveValue(5);
        });

        test('should submit form and handle success', async () => {
            const mockSetStockItems = vi.fn();
            const mockFetchStockItems = vi.fn().mockResolvedValue([
                {ID: 1, LABEL: 'Item 1', DESCRIPTION: 'Great item', QUANTITY: 10, STOCK_ID: 1}
            ]);

            (addStockItem as jest.MockedFunction<typeof addStockItem>).mockResolvedValue(undefined);
            (fetchStockItems as jest.MockedFunction<typeof fetchStockItems>).mockImplementation(mockFetchStockItems);

            render(
                <StockItemsContext.Provider value={{ stockItems: [],setStockItems: mockSetStockItems}}>
                    <AddStockItem stockID={1}/>
                </StockItemsContext.Provider>
            );

            fireEvent.click(screen.getByText('+'));

            fireEvent.change(screen.getByPlaceholderText('Label'), {target: {value: 'New Item'}});
            fireEvent.change(screen.getByPlaceholderText('Description'), {target: {value: 'New Description'}});
            fireEvent.change(screen.getByPlaceholderText('Quantity'), {target: {value: '5'}});

            fireEvent.click(screen.getByText('Add Item'));

            await waitFor(() => {
                expect(mockSetStockItems).toHaveBeenCalledWith([
                    {ID: 1, LABEL: 'Item 1', DESCRIPTION: 'Great item', QUANTITY: 10, STOCK_ID: 1}
                ]);
            });
        });

        test('should handle errors when submitting the form', async () => {
            const mockSetStockItems = vi.fn();
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            (addStockItem as jest.MockedFunction<typeof addStockItem>).mockRejectedValue(new Error('Failed to add item'));

            render(
                <MemoryRouter>
                    <StockItemsContext.Provider value={{ stockItems: [],setStockItems: mockSetStockItems}}>
                        <AddStockItem stockID={1}/>
                    </StockItemsContext.Provider>
                </MemoryRouter>
            );

            fireEvent.click(screen.getByText('+'));

            fireEvent.change(screen.getByPlaceholderText('Label'), {target: {value: 'New Item'}});
            fireEvent.change(screen.getByPlaceholderText('Description'), {target: {value: 'New Description'}});
            fireEvent.change(screen.getByPlaceholderText('Quantity'), {target: {value: '5'}});

            fireEvent.click(screen.getByText('Add Item'));

            await waitFor(() => {
                expect(consoleErrorSpy).toHaveBeenCalledWith('Error in adding stock item', expect.any(Error));
            });
            consoleErrorSpy.mockRestore();
        });

    })

})

