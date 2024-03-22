import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';

interface Stock {
    ID: number;
    LABEL: string;

}

const StocksList: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Appel à l'API pour récupérer la liste des stocks
        fetch('http://localhost:3000/api/v1/stocks', {
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
            .then((data: Stock[]) => {
                console.log('JSON data recovered stocklist:', data);
                setStocks(data);
            })
            .catch(error => console.error('Error in recovering inventory', error));
    }, []);

    return (
        <div>
            <h2>Liste des stocks</h2>
            <ul>
                {stocks.map(stock => {
                    console.log(stock)
                    return (
                        <li key={stock.ID}>
                            <Link to={`/stocks/${stock.ID}`}>
                                {stock.LABEL}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <button onClick={() => navigate('/home')}>Retour à l'accueil</button>
        </div>
    );
};

export default StocksList;
