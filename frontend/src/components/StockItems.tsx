import React, {useContext, useEffect, useRef} from 'react';
import {fetchStockItems} from "../utils/StockAPIClient.ts";
import {StockItemsContext} from "../contexts/StockItemsContext.tsx";
import {StockItemsProps} from "../frontModels.ts";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";


const StockItems: React.FC<StockItemsProps> = ({ID}) => {
    const numericID = Number(ID);
    const {stockItems, setStockItems} = useContext(StockItemsContext);
    const hasFetched = useRef(false);

    const fetchDataInner = async () => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        try {
            const data = await fetchStockItems(numericID);
            if (setStockItems) {
                setStockItems(data);
            }
        } catch (error) {
            console.error('Error in recovering stock items', error);
        }
    };

    useEffect(() => {
        fetchDataInner();
    }, [ID, numericID, stockItems]);


    if (!stockItems) {
        return <div>Loading...</div>;
    }
    if (stockItems.length === 0) {
        return <div className="mt-5 mb-5">
            Your stock is empty. Please add items.
        </div>;
    }

    //TODO: check if it is possible to create a "graphic" component to put in the return
    return (
        <div className="flex flex-col items-center w-full p-10 mr-auto max-w-screen-lg">

            <div className="grid grid-cols-4 gap-4 mb-5 w-full">
                <p>N°</p>
                <p>Label</p>
                <p>Quantity</p>
                <p>Details</p>
            </div>
            {stockItems.map((item, index) => (

                <div key={item.ID} className="grid grid-cols-4 gap-4 items-center mb-2 w-full">
                    <p>{index + 1}</p>
                    <p>{item.LABEL}</p>
                    <p>
                        {item.QUANTITY}
                        {item.isLowStock && (
                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 ml-2"/>
                        )}
                    </p>
                    {/*<p>{item.QUANTITY}</p>*/}
                    <p><Link to={`/stocks/${item.STOCK_ID}/items/${item.ID}`}
                             className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-1 px-2 rounded text-xs w-full text-center">
                        <FontAwesomeIcon icon={faSearch}/>
                    </Link></p>
                </div>
            ))}

        </div>
    );
};
export default StockItems;
