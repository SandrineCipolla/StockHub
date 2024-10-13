import React, {useEffect, useRef, useState} from 'react';
import {fetchLowStockItems} from '../utils/StockAPIClient';
import {Item} from "../dataModels.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const LowStockItemsList: React.FC = () => {
    const [lowStockItems, setLowStockItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const hasFetched = useRef(false);

    const fetchData = async () => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        try {
            const data = await fetchLowStockItems();
            console.log('Données des articles à faible stock:', data);
            setLowStockItems(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des stocks faibles', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <p>Chargement...</p>;
    }


    return (
        <div className="flex flex-col items-center w-full p-10">
            <h2 className="text-2xl font-bold mb-5">Articles à faible stock</h2>
            {lowStockItems.length === 0 ? (
                <p>Aucun article à faible stock trouvé.</p>
            ) : (
                <ul className="w-full">
                    {lowStockItems.map((item) => (
                        <li key={item.ID} className="flex items-center mb-4 p-4 border-b border-gray-300 pl-4">
                            <p className="w-1/3 font-bold text-purple-600 hover:text-violet-300 ml-30">{item.LABEL}</p>
                            <p className="w-1/3 ml-30 ">{item.QUANTITY} en stock</p>
                            <p className="w-1/3 ml-30">(Stock ID: {item.STOCK_ID})</p>
                        </li>
                    ))}
                </ul>

            )}
            <button className="mt-6 mb-3 text-xs bg-violet-400 text-purple-950"
                    onClick={() => navigate('/')}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>
            </button>
        </div>
    );
};

export default LowStockItemsList;