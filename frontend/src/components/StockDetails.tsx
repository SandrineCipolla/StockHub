import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface StockDetails {
    ID: number;
    LABEL: string;
    QUANTITY: number;
    DESCRIPTION: string;
}

const StockDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [stockDetail, setStockDetail] = useState<StockDetails | null>(null);

    useEffect(() => {
        // Récupération des détails du stock depuis l'API
        fetch(`http://localhost:3000/api/v1/stocks/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP response with a status ${response.status}`);
                }
                return response.json();
            })
            .then((data: StockDetails) => {
                console.log('JSON data recovered:', data);
                setStockDetail(data);
            })
            .catch(error => console.error('Error in recovering stock detail', error));
    }, [id]);

    if (!stockDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Stock Detail</h2>
            <p>ID: {stockDetail.ID}</p>
            <p>Label: {stockDetail.LABEL}</p>
            {/* Display other fields as necessary */}
        </div>
    );
};

export default StockDetails;