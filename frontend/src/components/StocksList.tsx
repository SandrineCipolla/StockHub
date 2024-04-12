import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {fetchStocksList} from "../utils/StockAPIClient.ts";
import {Stock} from "../models.ts";



const StocksList: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchStocksList();
                console.log('JSON data recovered stocklist:', data);
                setStocks(data);
            } catch (error) {
                console.error('Error in recovering inventory', error);
            }
        };

        fetchData();
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
