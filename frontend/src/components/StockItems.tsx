import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchStockItems, updateStockItemQuantity} from "../utils/StockAPIClient.ts";
import {StockItem, StockItemsProps} from "../models.ts";


const StockItems: React.FC<StockItemsProps> = () => {
    const {ID} = useParams<{ ID: string }>();
    const numericID = Number(ID);

    const [quantities, setQuantities] = useState<number[]>([]);
    const [stockItems, setStockItems] = useState<StockItem[]>([]);

    // const navigate = useNavigate();


    useEffect(() => {
    }, [stockItems]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchStockItems(numericID);
                setStockItems(data);
                setQuantities(data.map(item => item.QUANTITY));
            } catch (error) {
                console.error('Error in recovering stock items', error);
            }
        };
        fetchData().catch(error => console.error('Error in fetching data:', error));
    }, [ID, numericID]);

    const handleQuantityChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantities = [...quantities];
        newQuantities[index] = Number(event.target.value);
        console.info('New quantity:', newQuantities[index]);
        setQuantities(newQuantities);
    };

    const handleQuantityUpdate = async (stockID:number,index: number) => {
        if (quantities === undefined) {
            console.error('Quantity is undefined');
            return;
        }

        try {
            await updateStockItemQuantity(stockID,stockItems[index].ID, quantities[index]);
            const updatedStockItems = await fetchStockItems(numericID);
            setStockItems(updatedStockItems);
            setQuantities(updatedStockItems.map(item => item.QUANTITY));
            console.info('PUT request sent with quantity:', quantities[index]);
        } catch (error) {
            console.error('Error in updating stock quantity', error);
        }
    };


    if (!stockItems) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="mb-4">Stock Items</h2>
            <div className="flex justify-between mb-4 w-full">
                <p className="mr-2">ID</p>
                <p className="mr-2">Label</p>
                <p className="mr-2">Quantity</p>
                <p className="mr-2">Update Quantity</p>
                <p className="mr-2">Description</p>
            </div>
            {stockItems.map((item, index) => (
                < div key={item.ID} className="flex justify-between mb-4 w-full">
                    <p className="mr-2">{item.ID}</p>
                    <p className="mr-2">{item.LABEL}</p>
                    <p className="mr-2">{item.QUANTITY}</p>

                    <div className="mr-2 flex items-start w-32">
                        <input type="number" value={quantities[index]} onChange={handleQuantityChange(index)}
                               className="text-right mb-2 w-1/3"/>
                        <button onClick={() => handleQuantityUpdate(item.STOCK_ID,index)}
                                className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded text-xs w-2/3 mr-1">
                            Update
                        </button>
                    </div>
                    <p className="mr-2">{item.DESCRIPTION}</p>
                </div>
            ))}
            {/*<button onClick={() => navigate('/stocks')}>Retour à la liste des stocks</button>*/}

        </div>
    );
};
export default StockItems;
