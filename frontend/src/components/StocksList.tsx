import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {fetchStocksList} from "../utils/StockAPIClient.ts";
import {Stock} from "../dataModels.ts";
import AddStock from "./AddStock.tsx";
import {AuthenticatedTemplate} from "@azure/msal-react";


const StocksList: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const navigate = useNavigate();
    const hasFetched = useRef(false);

    const fetchDataInner = async () => {
        // if (hasFetched.current) return;
        // hasFetched.current = true;

        try {
            const dataStocksList = await fetchStocksList();
            console.info('JSON data recovered stocklist:', dataStocksList);
            setStocks(dataStocksList);
        } catch (error) {
            console.error('Error fetching stocks list:', error);
        }
    };
    useEffect(() => {
        if (!hasFetched.current) {
            fetchDataInner();
            hasFetched.current = true;
        }
    }, []);
    const handleStockAdded = () => {
        fetchDataInner();
    };

    return (
        <AuthenticatedTemplate>
            <div>
                <h2 className="text-lg font-bold mb-2 mt-2">Liste des stocks</h2>
                <ul>
                    {stocks.map(stock => (
                        <li className="mb-2 text-purple-600 hover:text-violet-300" key={stock.id}>
                            <Link to={`/stocks/${stock.id}`}>
                                {stock.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <AddStock onStockAdded={handleStockAdded}/>
                <button className="mt-6 mb-3 text-xs bg-violet-400 text-purple-950"
                        onClick={() => navigate('/')}>Retour à l'accueil
                </button>

            </div>
        </AuthenticatedTemplate>
    );
};

export default StocksList;
