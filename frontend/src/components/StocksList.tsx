import React, { useState, useEffect } from 'react';

interface Stock {
  ID: number;
  LABEL: string;
}

const StocksList: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    // Appel à l'API pour récupérer la liste des stocks
    fetch('http://localhost:3000/api/v1/stocks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Réponse HTTP avec un statut ${response.status}`);
        }
        return response.json();
      })
      .then((data: Stock[]) => {
        console.log('Données JSON récupérées:', data);
        setStocks(data);
      })
      .catch(error => console.error('Erreur lors de la récupération des stocks', error));
  }, []);

  return (
    <div>
      <h2>Liste des stocks</h2>
      <ul>
        {stocks.map(stock => (
          <li key={stock.ID}>{stock.LABEL}</li>
        ))}
      </ul>
    </div>
  );
};

export default StocksList;
