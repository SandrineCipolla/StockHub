import React, {useContext, useEffect, useState} from 'react';
import {fetchStockItems, updateStockItemQuantity} from "../utils/StockAPIClient.ts";
import {StockItemsContext} from "../contexts/StockItemsContext.tsx";
import {StockItemsProps} from "../frontModels.ts";


const StockItems: React.FC<StockItemsProps> = ({ID}) => {
    
    const numericID = Number(ID);

    const [quantities, setQuantities] = useState<number[]>([]);
    const {stockItems, setStockItems} = useContext(StockItemsContext);

    useEffect(() => {
    }, [stockItems]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchStockItems(numericID);
                if (setStockItems) {
                    setStockItems(data);
                }
                if (setQuantities) {
                    setQuantities(data.map(item => item.QUANTITY || 0));
                }
            } catch (error) {
                console.error('Error in recovering stock items', error);
            }
        };
        fetchData().catch(error => console.error('Error in fetching data:', error));
    }, [ID, numericID, setStockItems]);

    const handleQuantityChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantities = [...quantities];
        newQuantities[index] = Number(event.target.value);
        console.info('New quantity:', newQuantities[index]);
        setQuantities(newQuantities);
    };

    const handleQuantityUpdate = async (stockID: number, index: number) => {
        if (quantities === undefined || stockItems === undefined) {
            console.error('Quantity is undefined');
            return;
        }

        try {
            await updateStockItemQuantity(stockID, stockItems[index].ID, quantities[index]);
            const updatedStockItems = await fetchStockItems(numericID);
            if (setStockItems) {
                setStockItems(updatedStockItems);
            }
            if (setQuantities) {
                setQuantities(updatedStockItems.map(item => item.QUANTITY));
            }
            console.info('PUT request sent with quantity:', quantities[index]);
        } catch (error) {
            console.error('Error in updating stock quantity', error);
        }
    };


    if (!stockItems) {
        return <div>Loading...</div>;
    }

    //TODO: check if it is possible to create a "graphic" component to put in the return
    return (
        <div className="flex flex-col items-center w-full p-10 mr-auto max-w-screen-lg">
            <div className="flex justify-between mb-5 w-full">
                <div className="ml-auto flex items-start w-32">
                    <p className="ml-auto mr-1">N°</p>
                </div>
                <div className="ml-auto flex items-start w-32">
                    <p className="ml-auto">Label</p>
                </div>
                <div className="ml-auto flex items-start w-32">
                    <p className="ml-auto">Quantity</p>
                </div>
                <div className="ml-auto flex items-start w-32">
                    <p className="ml-auto">Description</p>
                </div>
                <div className="ml-auto flex items-start w-32">
                    <p className="ml-auto">Update Quantity</p>
                </div>
            </div>
            {stockItems.map((item, index) => (
                < div key={item.ID} className="flex items-center justify-between mb-2 w-full">

                    <div className="ml-auto flex items-start w-32">
                        <p className="ml-auto mr-1">{index + 1}</p>
                    </div>
                    <div className="ml-auto flex items-start w-32">
                        <p className="ml-auto">{item.LABEL}</p>
                    </div>
                    <div className="ml-auto flex items-start w-32">
                        <p className="ml-auto mr-5">{item.QUANTITY}</p>
                    </div>
                    <div className="ml-auto flex items-start w-32">
                        <p className="ml-auto">{item.DESCRIPTION}</p>
                    </div>

                    <div className="ml-auto flex items-start w-32">
                        <input type="number" value={quantities[index]} onChange={handleQuantityChange(index)}
                               className="text-right mt-0.5 w-1/3"/>
                        <button onClick={() => handleQuantityUpdate(item.STOCK_ID, index)}
                                className="bg-violet-400 text-purple-200 hover:bg-violet-600 font-bold py-1 px-2 rounded text-xs w-2/3 mr-1 mt-0.5">
                            Update
                        </button>
                    </div>

                </div>
            ))}

        </div>
    );
};
export default StockItems;
