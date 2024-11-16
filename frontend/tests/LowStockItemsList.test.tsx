import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import {fetchLowStockItems} from "../src/utils/StockAPIClient";
import LowStockItemsList from "../src/components/LowStockItemsList";

// Mock de la fonction fetchLowStockItems
vi.mock('../src/utils/StockAPIClient', () => ({
    fetchLowStockItems: vi.fn(),
}));

const mockFetchLowStockItems = fetchLowStockItems as jest.Mock;

// Mock des données de test
const mockData = [
    {
        ID: 1,
        STOCK_ID: 10,
        LABEL: 'Article 1',
        QUANTITY: 5,
        stockLabel: 'Stock A',
    },
    {
        ID: 2,
        STOCK_ID: 20,
        LABEL: 'Article 2',
        QUANTITY: 2,
        stockLabel: 'Stock B',
    },
];

describe('LowStockItemsList', () => {
    beforeEach(() => {
        mockFetchLowStockItems.mockReset();
    });

    it('affiche "Chargement..." pendant la récupération des données', () => {
        // Rendu du composant
        render(
            <BrowserRouter>
                <LowStockItemsList />
            </BrowserRouter>
        );

        // Vérifie que le texte de chargement est affiché
        expect(screen.getByText('Chargement...')).toBeInTheDocument();
    });

    it('affiche les articles à faible stock après la récupération des données', async () => {
        // Simule la résolution de la promesse avec des données mockées
        mockFetchLowStockItems.mockResolvedValueOnce(mockData);

        render(
            <BrowserRouter>
                <LowStockItemsList />
            </BrowserRouter>
        );

        // Attendre que les articles soient affichés
        await waitFor(() => {
            expect(screen.getByText('Article 1')).toBeInTheDocument();
            expect(screen.getByText('Article 2')).toBeInTheDocument();
        });
    });

    it('affiche un message lorsque aucun article à faible stock n\'est trouvé', async () => {
        // Simule une réponse vide
        mockFetchLowStockItems.mockResolvedValueOnce([]);

        render(
            <BrowserRouter>
                <LowStockItemsList />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Aucun article à faible stock trouvé.')).toBeInTheDocument();
        });
    });

    // it('affiche une erreur si la récupération des données échoue', async () => {
    //     // Simule une erreur
    //     mockFetchLowStockItems.mockRejectedValueOnce(new Error('Erreur réseau'));
    //
    //     render(
    //         <BrowserRouter>
    //             <LowStockItemsList />
    //         </BrowserRouter>
    //     );
    //
    //     await waitFor(() => {
    //         expect(screen.getByText('Erreur lors de la récupération des stocks faibles')).toBeInTheDocument();
    //     });
    // });
});
