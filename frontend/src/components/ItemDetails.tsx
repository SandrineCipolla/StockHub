import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {deleteStockItem, fetchItemDetails, updateStockItemQuantity} from "../utils/StockAPIClient.ts";
import {Item} from "../dataModels.ts";
import {faArrowLeft, faSync, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ItemDetails: React.FC = () => {
    const {ID} = useParams<{ ID: string }>();
    const itemID = Number(ID);
    const stockID = Number(ID);
    const [itemDetail, setItemDetail] = useState<Item | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number | null>(null);
    const navigate = useNavigate();
    const hasFetched = useRef(false);

    const fetchDataInner = async () => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        try {

            const data = await fetchItemDetails(stockID, itemID);

            setItemDetail(data);
            setQuantity(data.QUANTITY);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch item details');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDataInner();
    }, [stockID, itemID]);


    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    };

    const handleQuantityUpdate = async () => {

        if (!itemDetail || quantity == null) {
            return
        }
        try {
            await updateStockItemQuantity(itemDetail.STOCK_ID, itemDetail.ID, quantity);
            const updatedItem = await fetchItemDetails(stockID, itemID);
            setItemDetail(updatedItem);
        } catch (error) {
            console.error('Error in updating stock quantity', error);
        }

    };

    const handleItemDelete = async () => {
        if (itemDetail && window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteStockItem(itemDetail.STOCK_ID, itemDetail.ID);
                navigate(`/stocks/${itemDetail.STOCK_ID}`);
            } catch (error) {
                console.error('Error in deleting stock item:', error);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) return <div>{error}</div>;
    if (!itemDetail) return <div>Item not found.</div>;

    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <h2 className="text-lg font-bold mb-2 mt-2">{itemDetail.LABEL}</h2>
                <p className="text-m font-semibold">{itemDetail.DESCRIPTION}</p>
                <div className="flex items-center justify-center mt-2">
                    <p className="text-m font-semibold">Quantité : {itemDetail.QUANTITY}</p>
                    <div>
                        <input
                            type="number"
                            value={quantity !== null ? quantity : ''}
                            onChange={handleQuantityChange}
                            className="ml-2 p-1 border rounded w-16 text-center" // Adjust width here
                        />
                        <button
                            onClick={handleQuantityUpdate}
                            className="ml-2 p-1 bg-violet-400 text-white rounded"
                        >

                            <FontAwesomeIcon icon={faSync}/>

                        </button>
                    </div>
                </div>
                <p className="text-m font-semibold">Stock : {itemDetail.STOCK_ID}</p>
            </div>
            <div className="self-center mt-4 mb-4">
                <button
                    onClick={handleItemDelete}
                    className="bg-red-500 text-white hover:bg-red-700 font-bold py-2 px-4 rounded"
                >

                    <FontAwesomeIcon icon={faTrash}/>

                </button>
            </div>
            <div className="self-center mt-4 mb-4">
                <button
                    onClick={() => navigate(`/stocks/${itemDetail.STOCK_ID}`)}
                    className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded"
                >

                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>
                </button>
            </div>
        </div>
    );
};

export default ItemDetails;