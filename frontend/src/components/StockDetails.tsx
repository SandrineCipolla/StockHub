import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchStockDetails, updateStockQuantity} from "../utils/StockAPIClient.ts";
import {StockDetail} from "../models.ts";


const StockDetails: React.FC = () => {
    const {ID} = useParams<{ ID: string }>();
    const numericID = Number(ID);

    const [quantity, setQuantity] = useState<number>(0);
    const [stockDetail, setStockDetail] = useState<StockDetail | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
    }, [stockDetail]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchStockDetails(numericID);
                setStockDetail(data);
                setQuantity(data.QUANTITY);
            } catch (error) {
                console.error('Error in recovering stock detail', error);
            }
        };
        fetchData().catch(error => console.error('Error in fetching data:', error));// permet d'afficher une erreur si la requête fetch ne fonctionne pas
    }, [ID, numericID]);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Number(event.target.value);
        console.info('New quantity:', newQuantity);
        setQuantity(newQuantity);
    };

    const handleQuantityUpdate = async () => {
       if (quantity === undefined) {
            console.error('Quantity is undefined');
            return;
       }

        try {
           await updateStockQuantity(numericID, quantity);
           const updatedStock = await fetchStockDetails(numericID);
           setStockDetail(updatedStock);
           console.info('PUT request sent with quantity:', quantity);
        } catch (error) {
            console.error('Error in updating stock quantity', error);
        }
    };


    if (!stockDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center">
            <h2>Stock Detail</h2>
            <p>ID: {stockDetail.ID}</p>
            <p>Label: {stockDetail.LABEL}</p>
            <p>Quantity: {stockDetail.QUANTITY}</p>

            <input type="number" value={quantity} onChange={handleQuantityChange} className="mr-2"/>
            <button onClick={handleQuantityUpdate}
                    className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                Mettre à jour la quantité
            </button>
            <p>Description: {stockDetail.DESCRIPTION}</p>


            <button onClick={() => navigate('/stocks')}>Retour à la liste des stocks</button>
        </div>
    );
};

export default StockDetails;