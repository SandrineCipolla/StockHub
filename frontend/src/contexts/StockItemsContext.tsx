import React, {createContext, useState} from 'react';
import {StockItem} from '../dataModels.ts';

interface StockItemsContextProps {
    stockItems: StockItem[];
    setStockItems: React.Dispatch<React.SetStateAction<StockItem[]>>;
}

export const StockItemsContext = createContext<StockItemsContextProps>({
    stockItems: [],
    setStockItems: () => {
    },
});

export const StockItemsProvider: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({children}) => {
    const [stockItems, setStockItems] = useState<StockItem[]>([]);

    return (
        <StockItemsContext.Provider value={{stockItems, setStockItems}}>
            {children}
        </StockItemsContext.Provider>
    );
};