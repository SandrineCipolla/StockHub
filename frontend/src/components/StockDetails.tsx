import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchStockDetails} from "../utils/StockAPIClient.ts";
import {StockDetail} from "../dataModels.ts";


const StockDetails: React.FC = () => {
    const {ID} = useParams<{ ID: string }>();
    const numericID = Number(ID);

    const [stockDetail, setStockDetail] = useState<StockDetail | null>(null);


    useEffect(() => {
    }, [stockDetail]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchStockDetails(numericID);
                setStockDetail(data);
            } catch (error) {
                console.error('Error in recovering stock detail', error);
            }
        };
        //TODO affiner message d'erreur si la requete fetch ne fonctionne pas
        fetchData().catch(error => console.error('Error in fetching data:', error));
    }, [ID, numericID]);

    if (!stockDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col h-full justify-between">

            <div>
                <h2 className="text-lg font-bold mb-2 mt-2">{stockDetail.LABEL}</h2>
                <p className="text-m font-semibold">{stockDetail.DESCRIPTION}</p>
            </div>

        </div>
    );
};

export default StockDetails;