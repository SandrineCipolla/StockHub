import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchItemDetails} from "../utils/StockAPIClient.ts";
import {StockDetail} from "../dataModels.ts";


const ItemDetails: React.FC = () => {
    const {ID} = useParams<{ ID: string }>();
    const numericID = Number(ID);

    const [itemDetail, setItemDetail] = useState<StockDetail | null>(null);


    useEffect(() => {
    }, [itemDetail]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchItemDetails(numericID);
                setItemDetail(data);
            } catch (error) {
                console.error('Error in recovering item detail', error);
            }
        };
        //TODO affiner message d'erreur si la requete fetch ne fonctionne pas
        fetchData().catch(error => console.error('Error in fetching data:', error));
    }, [ID, numericID]);

    if (!itemDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col h-full justify-between">

            <div>
                <h2 className="text-lg font-bold mb-2 mt-2">{itemDetail.LABEL}</h2>
                <p className="text-m font-semibold">{itemDetail.DESCRIPTION}</p>
            </div>

        </div>
    );
};

export default ItemDetails;