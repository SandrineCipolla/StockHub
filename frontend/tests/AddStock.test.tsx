import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {vi} from 'vitest';
import AddStock from '../src/components/AddStock';
import {addStock} from '../src/utils/StockAPIClient';
// Import the mocked Modal component
import Modal from './mocks/react-modal';



// Mock the addStock function
vi.mock('../src/utils/StockAPIClient', () => ({
    addStock: vi.fn(),
}));

// Mock Modal to avoid issues with mounting
vi.mock('react-modal', () => ({
    __esModule: true,
    default: Modal,
    setAppElement: vi.fn(),
}));

describe('AddStock Component', () => {
    test('opens and closes the form modal', () => {
        const onStockAdded = vi.fn();

        render(<AddStock onStockAdded={onStockAdded}/>);

        // Open the modal
        fireEvent.click(screen.getByText('+'));
        expect(screen.getByTestId('modal')).toBeInTheDocument();

        // Close the modal by clicking the close button
        fireEvent.click(screen.getByText('Close Modal'));
        expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    test('submits the form and calls onStockAdded', async () => {
        const onStockAdded = vi.fn();
        const mockAddStock = addStock as vi.MockedFunction<typeof addStock>;

        render(<AddStock onStockAdded={onStockAdded}/>);

        // Open the modal
        fireEvent.click(screen.getByText('+'));

        // Fill in the form
        fireEvent.change(screen.getByPlaceholderText('Label'), {target: {value: 'New Stock'}});
        fireEvent.change(screen.getByPlaceholderText('Description'), {target: {value: 'Stock Description'}});

        // Submit the form
        fireEvent.click(screen.getByText('Add Stock'));

        await waitFor(() => {
            expect(mockAddStock).toHaveBeenCalledWith('New Stock', 'Stock Description');
            expect(onStockAdded).toHaveBeenCalled();
        });
    });
});

