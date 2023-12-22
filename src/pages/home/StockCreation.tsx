import React from 'react';

interface StockCreationProps {
  onAddStock?: () => void;  // propriété / ? optionnel / ()type fonction / ne prend pas d'arguments
}

const StockCreation: React.FC<StockCreationProps> = ({ onAddStock }) => {
  
  return (
    <div>
      <button onClick={onAddStock}>Add a new stock</button> 
    </div>
  );
};

export default StockCreation; 
