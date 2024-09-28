import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {fetchItemsList} from "../utils/StockAPIClient.ts";
import {Item} from "../dataModels.ts";


const ItemsList: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchItemsList();
                console.info('JSON data recovered itemslist:', data);
                console.log('data:', data);
                setItems(data);
            } catch (error) {
                console.error('Error in recovering inventory', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <h2 className="text-lg font-bold mb-2 mt-2">Liste des produits</h2>
            <ul>
                {items.map(item => {
                    return (
                        <li className="mb-2 text-purple-600 hover:text-violet-300" key={item.ID}>
                            <Link to={`/items/${item.ID}`}>
                                {item.LABEL}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <button className="mt-6 mb-3 text-xs bg-violet-400 text-purple-950" onClick={() => navigate('/')}>Retour
                à l'accueil
            </button>
        </div>
    );
};

export default ItemsList;
