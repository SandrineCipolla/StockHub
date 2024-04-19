import React from "react";
import {useParams} from "react-router-dom";
import StockDetails from "./StockDetails.tsx";
import StockItems from "./StockItems.tsx";




const StockDetailsWithItems: React.FC = ()=> {
    const {ID} = useParams<{ ID: string }>();

    return (
        <div>
            <StockDetails/>
            <StockItems ID={ID}/>
        </div>
    );
};

export default StockDetailsWithItems;