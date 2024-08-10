import React, {createContext, useState} from 'react';
import {Stock} from '../dataModels.ts';

interface StocksContextProps {
    stocks: Stock[];
    setStocks: React.Dispatch<React.SetStateAction<Stock[]>>;
}

export const StocksContext = createContext<StocksContextProps>({
    stocks: [],
    setStocks: () => {
    },
});

export const StocksProvider: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({children}) => {
    const [stocks, setStocks] = useState<Stock[]>([]);

    return (
        <StocksContext.Provider value={{stocks, setStocks}}>
            {children}
        </StocksContext.Provider>
    );
};