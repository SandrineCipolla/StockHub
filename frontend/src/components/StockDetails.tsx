import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

interface StockDetails {
    ID: number;
    LABEL: string;
    QUANTITY: number;
    DESCRIPTION: string;
}

const StockDetails: React.FC = () => {
    const {ID} = useParams<{ ID: string }>();
    const numericID = Number(ID);
    console.log('ID from params:', ID);

    const [quantity, setQuantity] = useState<number>(0);
    const [stockDetail, setStockDetail] = useState<StockDetails | null>(null);
    console.log('Stock detail:', stockDetail);

    const navigate = useNavigate();

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
                setQuantity(data.QUANTITY);
            })
            .catch(error => {
                console.error('Error in recovering stock detail', error)
            });
    }, [ID, numericID]);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    };

    const handleQuantityUpdate = () => {
        fetch(`http://localhost:3000/api/v1/stocks/${numericID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
            body: JSON.stringify({QUANTITY: quantity}),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP response with a status ${response.status}`);
                }
                return response.json();
            })
            .then((data: StockDetails) => {
                console.log('JSON data recovered stockdetails:', data);
                setStockDetail(data);
            })
            .catch(error => console.error('Error in updating stock quantity', error));
    }

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