import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface StockDetails {
    ID: number;
    LABEL: string;
    QUANTITY: number;
    DESCRIPTION: string;
}

const StockDetails: React.FC = () => {
    const { ID } = useParams<{ ID: string }>();
    const numericID = Number(ID);
    console.log('ID from params:', ID);
    const [stockDetail, setStockDetail] = useState<StockDetails | null>(null);
    console.log('Stock detail:', stockDetail);

    useEffect(() => {
        console.log('Stock detail updated:', stockDetail);
    }, [stockDetail]);

    useEffect(() => {
        // Récupération des détails du stock depuis l'API
        fetch(`http://localhost:3000/api/v1/stocks/${numericID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
        })
            .then(response => {
                console.log('Raw API response:', response);
                if (!response.ok) {
                    throw new Error(`HTTP response with a status ${response.status}`);
                }
                return response.json();
            })
            .then((data: StockDetails[] | StockDetails) => {
                if (Array.isArray(data)) {
                    data = data[0];
                }
                console.log('JSON data recovered stockdetails:', data);
                console.log('Type of data:', typeof data);
                // Vérifier si les données sont au format attendu
                if (
                    typeof data !== 'object' ||
                    !('ID' in data) ||
                    !('LABEL' in data) ||
                    !('QUANTITY' in data) ||
                    !('DESCRIPTION' in data)
                ) {
                    throw new Error('Data format is not as expected');
                }
                console.log('Data ID:', data.ID);
                console.log('Data LABEL:', data.LABEL);
                console.log('Data QUANTITY:', data.QUANTITY);
                console.log('Data DESCRIPTION:', data.DESCRIPTION);
                setStockDetail(data);
            })
            .catch(error => {
                console.error('Error in recovering stock detail', error)
            });
    }, [ID, numericID]);

    if (!stockDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Stock Detail</h2>
            <p>ID: {stockDetail.ID}</p>
            <p>Label: {stockDetail.LABEL}</p>
            <p>Quantity: {stockDetail.QUANTITY}</p>
            <p>Description: {stockDetail.DESCRIPTION}</p>
        </div>
    );
};

export default StockDetails;