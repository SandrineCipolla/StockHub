import React from 'react';
import StocksList from './../../components/StocksList';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Page d'accueil</h1>
      <StocksList />
    </div>
  );
};

export default Home;
