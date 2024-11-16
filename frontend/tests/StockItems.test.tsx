import {render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import StockItems from "../src/components/StockItems";
import {fetchStockItems} from "../src/utils/StockAPIClient";

// Mocking de l'API fetchStockItems
vi.mock('../src/utils/StockAPIClient', () => ({
    fetchStockItems: vi.fn(),
}));

const mockFetchStockItems = fetchStockItems as jest.Mock;

// Utilitaire pour rendre le composant avec le contexte
const renderComponent = () => {
    return render(

            <StockItems ID="1"/>
    );
};

describe('StockItems', () => {

    beforeEach(() => {
        mockFetchStockItems.mockReset();
    });
    it('should work', () => {
        expect(true).toBe(true);
    })

    // it('affiche "Loading..." lorsque les articles sont en cours de chargement', async () => {
    //     const mockSetStockItems = vi.fn();
    //     renderComponent({stockItems: [], setStockItems: mockSetStockItems});
    //
    //     // Vérifier que le texte "Loading..." est affiché
    //     expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    // });

    it('affiche "Your stock is empty. Please add items." lorsque le stock est vide', async () => {

        renderComponent();

        // Vérifier que le message pour stock vide est affiché
        expect(screen.getByText(/Your stock is empty. Please add items./i)).toBeInTheDocument();
    });
//
//     it('affiche les éléments du stock lorsque les données sont récupérées', async () => {
//         // const  mockSetStockItems = vi.fn();
//         const stockItemsMock = [
//             {ID: 1, LABEL: 'Item 1', QUANTITY: 10, isLowStock: false, STOCK_ID: 1, DESCRIPTION: 'description'},
//             {ID: 2, LABEL: 'Item 2', QUANTITY: 5, isLowStock: true, STOCK_ID: 1, DESCRIPTION: 'description'},
//         ];
//
//         mockFetchStockItems.mockResolvedValueOnce(stockItemsMock);  // Simule la récupération des articles
//
//         renderComponent();
//
//         // Attendre que les articles soient affichés
//         await waitFor(() => {
//             expect(screen.getByText('Item 1')).toBeInTheDocument();
//             expect(screen.getByText('Item 2')).toBeInTheDocument();
//         });
//     });
//
//     it('gère les erreurs lors de la récupération des données', async () => {
//         const mockSetStockItems = vi.fn();
//
//         // Simuler une erreur lors de la récupération des données
//         (fetchStockItems as vi.Mock).mockRejectedValue(new Error('Failed to fetch'));
//
//         renderComponent({stockItems: [], setStockItems: mockSetStockItems});
//
//         // Vérifier qu'un message d'erreur ou de fallback est affiché si l'API échoue
//         await waitFor(() => {
//             expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
//         });
//     });
//
//     it('appelle fetchStockItems lors du montage', async () => {
//         const mockSetStockItems = vi.fn();
//         const fetchStockItems = vi.fn().mockResolvedValue([{ID: 1, LABEL: 'Item 1', QUANTITY: 5}]);
//
//         // Remplacer la fonction `fetchStockItems` par la version mockée
//         vi.mock('../src/utils/StockAPIClient', () => ({
//             fetchStockItems: fetchStockItems,
//         }));
//
//         renderComponent({stockItems: [], setStockItems: mockSetStockItems});
//
//         // Vérifier que `fetchStockItems` a été appelé avec l'ID approprié
//         await waitFor(() => expect(fetchStockItems).toHaveBeenCalledWith(1));  // 1 est l'ID du stock
//     });
//
//     it('met à jour le rendu lorsque les stockItems changent', async () => {
//         const mockSetStockItems = vi.fn();
//         const stockItemsMock = [
//             {ID: 1, LABEL: 'Item 1', QUANTITY: 10, isLowStock: false, STOCK_ID: 1, DESCRIPTION: 'description'},
//         ];
//
//         const {rerender} = renderComponent({stockItems: [], setStockItems: mockSetStockItems});
//
//         // Vérifier que "Loading..." est initialement affiché
//         expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
//
//         // Mettre à jour les `stockItems` et re-render
//         rerender(
//             <StockItemsContext.Provider value={{stockItems: stockItemsMock, setStockItems: mockSetStockItems}}>
//                 <StockItems ID="1"/>
//             </StockItemsContext.Provider>
//         );
//
//         // Vérifier que le contenu est mis à jour avec les nouveaux articles
//         expect(screen.getByText('Item 1')).toBeInTheDocument();
//     });
});

//

//
// describe('StockItems', () => {
//
//     it('affiche "Loading..." lorsque les articles sont en cours de chargement', async () => {
//         const mockSetStockItems = vi.fn();
//         renderComponent({stockItems: [], setStockItems: mockSetStockItems});
//
//         // Vérifier que le texte "Loading..." est affiché
//         expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
//     });
//
//     it('affiche "Your stock is empty. Please add items." lorsque le stock est vide', async () => {
//         const mockSetStockItems = vi.fn();
//         renderComponent({stockItems: [], setStockItems: mockSetStockItems});
//
//         // Vérifier que le message pour stock vide est affiché
//         expect(screen.getByText(/Your stock is empty. Please add items./i)).toBeInTheDocument();
//     });
//
//     it('affiche les éléments du stock lorsque les données sont récupérées', async () => {
//         const mockSetStockItems = vi.fn();
//         const stockItemsMock = [
//             {ID: 1, LABEL: 'Item 1', QUANTITY: 10, isLowStock: false, STOCK_ID: 1, DESCRIPTION: 'description'},
//             {ID: 2, LABEL: 'Item 2', QUANTITY: 5, isLowStock: true, STOCK_ID: 1, DESCRIPTION: 'description'},
//         ];
//
//         (fetchStockItems as vi.Mock).mockResolvedValue(stockItemsMock);  // Simule la récupération des articles
//
//         renderComponent({stockItems: [], setStockItems: mockSetStockItems});
//
//         // Attendre que les articles soient affichés
//         await waitFor(() => {
//             expect(screen.getByText('Item 1')).toBeInTheDocument();
//             expect(screen.getByText('Item 2')).toBeInTheDocument();
//         });
//     });
//
//     it('gère les erreurs lors de la récupération des données', async () => {
//         const mockSetStockItems = vi.fn();
//
//         // Simuler une erreur lors de la récupération des données
//         (fetchStockItems as vi.Mock).mockRejectedValue(new Error('Failed to fetch'));
//
//         renderComponent({stockItems: [], setStockItems: mockSetStockItems});
//
//         // Vérifier qu'un message d'erreur ou de fallback est affiché si l'API échoue
//         await waitFor(() => {
//             expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
//         });
//     });
//
//     it('appelle fetchStockItems lors du montage', async () => {
//         const mockSetStockItems = vi.fn();
//         const fetchStockItems = vi.fn().mockResolvedValue([{ID: 1, LABEL: 'Item 1', QUANTITY: 5}]);
//
//         // Remplacer la fonction `fetchStockItems` par la version mockée
//         vi.mock('../src/utils/StockAPIClient', () => ({
//             fetchStockItems: fetchStockItems,
//         }));
//
//         renderComponent({stockItems: [], setStockItems: mockSetStockItems});
//
//         // Vérifier que `fetchStockItems` a été appelé avec l'ID approprié
//         await waitFor(() => expect(fetchStockItems).toHaveBeenCalledWith(1));  // 1 est l'ID du stock
//     });
//
//     it('met à jour le rendu lorsque les stockItems changent', async () => {
//         const mockSetStockItems = vi.fn();
//         const stockItemsMock = [
//             {ID: 1, LABEL: 'Item 1', QUANTITY: 10, isLowStock: false, STOCK_ID: 1, DESCRIPTION: 'description'},
//         ];
//
//         const {rerender} = renderComponent({stockItems: [], setStockItems: mockSetStockItems});
//
//         // Vérifier que "Loading..." est initialement affiché
//         expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
//
//         // Mettre à jour les `stockItems` et re-render
//         rerender(
//             <StockItemsContext.Provider value={{stockItems: stockItemsMock, setStockItems: mockSetStockItems}}>
//                 <StockItems ID="1"/>
//             </StockItemsContext.Provider>
//         );
//
//         // Vérifier que le contenu est mis à jour avec les nouveaux articles
//         expect(screen.getByText('Item 1')).toBeInTheDocument();
//     });
// });