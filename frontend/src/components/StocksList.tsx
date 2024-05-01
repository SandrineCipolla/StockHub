import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {fetchStocksList} from "../utils/StockAPIClient.ts";
import {Stock} from "../dataModels.ts";



const StocksList: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchStocksList();
                console.info('JSON data recovered stocklist:', data);
                setStocks(data);
            } catch (error) {
                console.error('Error in recovering inventory', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <h2 className="text-lg font-bold mb-2 mt-2">Liste des stocks</h2>
            <ul>
                {stocks.map(stock => {
                    return (
                        <li className="mb-2 text-purple-600 hover:text-violet-300" key={stock.ID}>
                            <Link to={`/stocks/${stock.ID}`}>
                                {stock.LABEL}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <button className="mt-6 mb-3 text-xs bg-violet-400 text-purple-950" onClick={() => navigate('/home')}>Retour à l'accueil</button>
        </div>
    );
};

export default StocksList;
