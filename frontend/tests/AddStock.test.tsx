import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AddStock from '../src/components/AddStock';
//import { addStock } from '../src/utils/StockAPIClient';
import * as StockAPIClient from './../src/utils/StockAPIClient';

// Mocking addStock API
vi.mock('./../src/utils/StockAPIClient', () => ({
    addStock: vi.fn().mockResolvedValue({}),
}));

describe('AddStock Component', () => {
    const mockOnStockAdded = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks(); // Reset mocks before each test
    });

    test('should open and close the modal when "+" button is clicked', () => {
        render(<AddStock onStockAdded={mockOnStockAdded} />);

        const openButton = screen.getByText('+');
        fireEvent.click(openButton);

        // The modal should be open
        expect(screen.getByPlaceholderText('Label')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();

        const closeButton = screen.getByText('X');
        fireEvent.click(closeButton);

        // Modal should close
        expect(screen.queryByPlaceholderText('Label')).not.toBeInTheDocument();
    });

    test('should call addStock with correct values when the form is submitted', async () => {
        render(<AddStock onStockAdded={mockOnStockAdded} />);

        fireEvent.click(screen.getByText('+'));

        const labelInput = screen.getByPlaceholderText('Label');
        const descriptionInput = screen.getByPlaceholderText('Description');

        fireEvent.change(labelInput, { target: { value: 'New Stock' } });
        fireEvent.change(descriptionInput, { target: { value: 'Stock Description' } });

        fireEvent.click(screen.getByText('Add Stock'));

        await waitFor(() => {
            expect(StockAPIClient.addStock).toHaveBeenCalledWith('New Stock', 'Stock Description');
            expect(mockOnStockAdded).toHaveBeenCalled();
        });
    });

    test('should reset fields after form submission', async () => {
        render(<AddStock onStockAdded={mockOnStockAdded} />);

        fireEvent.click(screen.getByText('+'));

        const labelInput = screen.getByPlaceholderText('Label');
        const descriptionInput = screen.getByPlaceholderText('Description');

        fireEvent.change(labelInput, { target: { value: 'New Stock' } });
        fireEvent.change(descriptionInput, { target: { value: 'Stock Description' } });

        fireEvent.click(screen.getByText('Add Stock'));

        await waitFor(() => {
            // Verify inputs are reset
            expect(labelInput).toHaveValue('');
            expect(descriptionInput).toHaveValue('');
        });
    });

    test('should close modal on cancel', async () => {
        render(<AddStock onStockAdded={mockOnStockAdded} />);

        fireEvent.click(screen.getByText('+'));

        const closeButton = screen.getByText('X');
        fireEvent.click(closeButton);

        // Modal should close
        expect(screen.queryByPlaceholderText('Label')).not.toBeInTheDocument();
    });
});
