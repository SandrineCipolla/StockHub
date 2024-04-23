import React, {useContext, useState} from 'react';
import {addStockItem, fetchStockItems} from "../utils/StockAPIClient.ts";
import {StockItemsContext} from "../contexts/StockItemsContext.tsx";

const AddStockItem: React.FC<{ stockID: number }> = ({stockID}) => {
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const {setStockItems} = useContext(StockItemsContext);


    //const [stockItems, setStockItems] = useState<StockItem[]>([]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.log('Submitting form with values:', {LABEL: label, DESCRIPTION: description, QUANTITY: quantity});
            await addStockItem(stockID, {
                LABEL: label,
                DESCRIPTION: description,
                QUANTITY: quantity
            });

            const newStockItems = await fetchStockItems(stockID);
            if (setStockItems) {
                setStockItems(newStockItems);
            }
            setLabel('');
            setDescription('');
            setQuantity(0);
        } catch (error) {
            console.error('Error in adding stock item', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={label} onChange={e => setLabel(e.target.value)} placeholder="Label" required/>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)}
                   placeholder="Description" required/>
            <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))}
                   placeholder="Quantity" required/>
            <button type="submit">Add Item</button>
        </form>
    );
};

export default AddStockItem;