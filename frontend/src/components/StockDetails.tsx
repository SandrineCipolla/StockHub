import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchStockDetails} from "../utils/StockAPIClient.ts";
import {StockDetail} from "../models.ts";


const StockDetails: React.FC = () => {
    const {ID} = useParams<{ ID: string }>();
    const numericID = Number(ID);

    // const [quantity, setQuantity] = useState<number>(0);
    const [stockDetail, setStockDetail] = useState<StockDetail | null>(null);



    useEffect(() => {
    }, [stockDetail]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchStockDetails(numericID);
                setStockDetail(data);
                // setQuantity(data.QUANTITY);
            } catch (error) {
                console.error('Error in recovering stock detail', error);
            }
        };
        fetchData().catch(error => console.error('Error in fetching data:', error));// permet d'afficher une erreur si la requête fetch ne fonctionne pas
    }, [ID, numericID]);

    // const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newQuantity = Number(event.target.value);
    //     console.info('New quantity:', newQuantity);
    //     setQuantity(newQuantity);
    // };
    //
    // const handleQuantityUpdate = async () => {
    //    if (quantity === undefined) {
    //         console.error('Quantity is undefined');
    //         return;
    //    }
    //
    //     try {
    //        await updateStockQuantity(numericID, quantity);
    //        const updatedStock = await fetchStockDetails(numericID);
    //        setStockDetail(updatedStock);
    //        console.info('PUT request sent with quantity:', quantity);
    //     } catch (error) {
    //         console.error('Error in updating stock quantity', error);
    //     }
    // };


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