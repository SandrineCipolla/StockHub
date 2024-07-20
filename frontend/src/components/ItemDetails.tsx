import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchItemDetails} from "../utils/StockAPIClient.ts";
import {Item} from "../dataModels.ts";


const ItemDetails: React.FC = () => {
    const {ID} = useParams<{ ID: string }>();
    const stockID = Number(ID);
    const itemID = Number(ID);

    const [itemDetail, setItemDetail] = useState<Item | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    // }, [itemDetail]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchItemDetails( stockID,itemID);
                setItemDetail(data);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch item details');
                setIsLoading(false);
            }
        };
        //TODO affiner message d'erreur si la requete fetch ne fonctionne pas
        fetchData();
    }, [stockID,itemID]);

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
                <p className="text-m font-semibold">Quantité : {itemDetail.QUANTITY}</p>
                <p className="text-m font-semibold">Stock : {itemDetail.STOCK_ID}</p>
            </div>

        </div>
    );
};

export default ItemDetails;