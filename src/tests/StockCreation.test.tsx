//import React from 'react';
import { render, screen} from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import StockCreation from '../components/StockCreation';

describe ("Page Principale", () => {
  test('Le composant StockCreation est visible', () => {
    // Dom Virtuel
    render(<StockCreation />);
    // Assertions
    expect(screen.getByText('Créer un Nouveau Stock')).toBeInTheDocument();
  });
});

