import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchStockDetails} from "../utils/StockAPIClient.ts";
import {StockDetail} from "../dataModels.ts";


const StockDetails: React.FC = () => {
    const {ID} = useParams<{ ID: string }>();
    const numericID = Number(ID);

    const [stockDetail, setStockDetail] = useState<StockDetail | null>(null);
    const hasFetched = useRef(false);

    const fetchDataInner = async () => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        try {
            const data = await fetchStockDetails(numericID);
            setStockDetail(data);
        } catch (error) {
            console.error('Error in recovering stock detail', error);
        }
    };

    useEffect(() => {
        fetchDataInner();
    }, [ID, numericID, stockDetail]);

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