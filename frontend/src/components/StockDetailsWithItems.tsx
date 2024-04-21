import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import StockDetails from "./StockDetails.tsx";
import StockItems from "./StockItems.tsx";


const StockDetailsWithItems: React.FC = () => {
    const {ID} = useParams<{ ID: string }>();

    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <StockDetails/>
                <StockItems ID={ID}/>
            </div>
            <div className="self-center">
                <button className="mt-6 mb-3 text-xs bg-violet-400 text-purple-950" onClick={() => navigate('/stocks')}>Retour à la liste des stocks</button>
            </div>
        </div>
    )
        ;
};

export default StockDetailsWithItems;