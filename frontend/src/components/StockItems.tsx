import React, {useContext, useEffect, useState} from 'react';
import {fetchStockItems} from "../utils/StockAPIClient.ts";
import {StockItemsContext} from "../contexts/StockItemsContext.tsx";
import {StockItemsProps} from "../frontModels.ts";
import {Link} from 'react-router-dom';


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

    // function refreshStockOnView(updatedStockItems: StockItem[]) {
    //     if (setStockItems) {
    //         setStockItems(updatedStockItems);
    //     }
    //     if (setQuantities) {
    //         setQuantities(updatedStockItems.map(item => item.QUANTITY));
    //     }
    // }

    // const handleQuantityChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newQuantities = [...quantities];
    //     newQuantities[index] = Number(event.target.value);
    //     console.info('New quantity:', newQuantities[index]);
    //     setQuantities(newQuantities);
    // };
    //
    // const handleQuantityUpdate = async (stockID: number, index: number) => {
    //     if (quantities === undefined || stockItems === undefined) {
    //         console.error('Quantity is undefined');
    //         return;
    //     }
    //     try {
    //         await updateStockItemQuantity(stockID, stockItems[index].ID, quantities[index]);
    //         const updatedStockItems = await fetchStockItems(numericID);
    //         refreshStockOnView(updatedStockItems);
    //         console.info('PUT request sent with quantity:', quantities[index]);
    //     } catch (error) {
    //         console.error('Error in updating stock quantity', error);
    //     }
    // };
    //
    // const handleItemDelete = async (stockID: number, itemID: number) => {
    //     if (!window.confirm('Are you sure you want to delete this item?')) {
    //         return;
    //     }
    //     try {
    //         // Appel de la fonction deleteStockItem
    //         await deleteStockItem(stockID, itemID);
    //
    //         const deletedItem = stockItems.find(item => item.ID === itemID);
    //         if (deletedItem) {
    //             const indexToDelete = stockItems.indexOf(deletedItem);
    //             stockItems.splice(indexToDelete, 1);
    //         }
    //
    //         refreshStockOnView(stockItems);
    //     } catch (error) {
    //         console.error('Error in deleting stock item:', error);
    //     }
    // };

    if (!stockItems) {
        return <div>Loading...</div>;
    }

    //TODO: check if it is possible to create a "graphic" component to put in the return
    return (
        <div className="flex flex-col items-center w-full p-10 mr-auto max-w-screen-lg">
            {/*<div className="flex justify-between mb-5 w-full">*/}
            {/*    <div className="ml-auto flex items-start w-32">*/}
            {/*        <p className="ml-auto mr-1">N°</p>*/}
            {/*    </div>*/}
            {/*    <div className="ml-auto flex items-start w-32">*/}
            {/*        <p className="ml-auto">Label</p>*/}
            {/*    </div>*/}
            {/*    <div className="ml-auto flex items-start w-32">*/}
            {/*        <p className="ml-auto">Quantity</p>*/}
            {/*    </div>*/}

            {/*    /!*<div className="ml-auto flex items-start w-32">*!/*/}
            {/*    /!*    <p className="ml-auto">Description</p>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    /!*<div className="ml-auto flex items-start w-32">*!/*/}
            {/*    /!*    <p className="ml-auto">Update Quantity</p>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*</div>*/}
            <div className="grid grid-cols-4 gap-4 mb-5 w-full">
                <p>N°</p>
                <p>Label</p>
                <p>Quantity</p>
                <p>Details</p>
            </div>
            {stockItems.map((item, index) => (
                // < div key={item.ID} className="flex items-center justify-between mb-2 w-full">
                //
                //     <div className="ml-auto flex items-start w-32">
                //         <p className="ml-auto mr-1">{index + 1}</p>
                //     </div>
                //     <div className="ml-auto flex items-start w-32">
                //         <p className="ml-auto">{item.LABEL}</p>
                //     </div>
                //     <div className="ml-auto flex items-start w-32">
                //         <p className="ml-auto mr-5">{item.QUANTITY}</p>
                //     </div>
                //     {/*<div className="ml-auto flex items-start w-32">*/}
                //     {/*    <p className="ml-auto">{item.DESCRIPTION}</p>*/}
                //     {/*</div>*/}
                //
                //     <div className="ml-auto flex items-start w-32">
                //         <Link to={`/stocks/${item.STOCK_ID}/items/${item.ID}`}
                //               className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-1 px-2 rounded text-xs w-full text-center">
                //             View Details
                //         </Link>
                //     </div>
                //
                //     {/*<div className="ml-auto flex items-start w-32">*/}
                //     {/*    <input type="number" value={quantities[index]} onChange={handleQuantityChange(index)}*/}
                //     {/*           className="text-right mt-0.5 w-1/3"/>*/}
                //     {/*    <button onClick={() => handleQuantityUpdate(item.STOCK_ID, index)}*/}
                //     {/*            className="bg-violet-400 text-purple-200 hover:bg-violet-600 font-bold py-1 px-2 rounded text-xs w-2/3 mr-1 mt-0.5">*/}
                //     {/*        Update*/}
                //     {/*    </button>*/}
                //     {/*</div>*/}
                //
                //     {/*<div className="ml-auto flex items-start w-32">*/}
                //     {/*    <button onClick={() => handleItemDelete(item.STOCK_ID, item.ID)}*/}
                //     {/*            className="bg-red-500 text-white hover:bg-red-700 font-bold py-1 px-2 rounded text-xs w-2/3 mr-1 mt-0.5">*/}
                //     {/*        Delete*/}
                //     {/*    </button>*/}
                //     {/*</div>*/}
                //
                // </div>
                <div key={item.ID} className="grid grid-cols-4 gap-4 items-center mb-2 w-full">
                    <p>{index + 1}</p>
                    <p>{item.LABEL}</p>
                    <p>{item.QUANTITY}</p>
                    <p><Link to={`/stocks/${item.STOCK_ID}/items/${item.ID}`}
                             className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-1 px-2 rounded text-xs w-full text-center">
                        View Details
                    </Link></p>
                </div>
            ))}

        </div>
    );
};
export default StockItems;
