import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {fetchStocksList} from "../utils/StockAPIClient.ts";
import {Stock} from "../dataModels.ts";
import AddStock from "./AddStock.tsx";


const StocksList: React.FC = () => {

    const [stocks, setStocks] = useState<Stock[]>([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        const dataStocksList = await fetchStocksList();
        console.info('JSON data recovered stocklist:', dataStocksList);
        setStocks(dataStocksList);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2 className="text-lg font-bold mb-2 mt-2">Liste des stocks</h2>
            <ul>
                {stocks.map(stock => (
                    <li className="mb-2 text-purple-600 hover:text-violet-300" key={stock.ID}>
                        <Link to={`/stocks/${stock.ID}`}>
                            {stock.LABEL}
                        </Link>
                    </li>
                ))}
            </ul>
            <AddStock onStockAdded={fetchData}/>
            <button className="mt-6 mb-3 text-xs bg-violet-400 text-purple-950"
                    onClick={() => navigate('/home')}>Retour à l'accueil
            </button>
        </div>
    );
};

export default StocksList;
