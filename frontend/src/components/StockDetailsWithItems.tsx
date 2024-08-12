import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import StockDetails from "./StockDetails.tsx";
import StockItems from "./StockItems.tsx";
import AddStockItem from "./AddStockItem.tsx";
import {StockItemsProvider} from "../contexts/StockItemsContext.tsx";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const StockDetailsWithItems: React.FC = () => {
    const {ID} = useParams<{ ID: string }>();
    const numericID = Number(ID);

    const navigate = useNavigate();

    return (
        <StockItemsProvider>
            <div className="flex flex-col h-full justify-between">
                <div>
                    <StockDetails/>
                    <StockItems ID={ID}/>
                    <AddStockItem stockID={numericID}/>
                </div>
                <div className="self-center">
                    <button className="mt-6 mb-3 text-xs bg-violet-400 text-purple-950"
                            onClick={() => navigate('/stocks')}>
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>
                    </button>
                </div>
            </div>
        </StockItemsProvider>
    )
        ;
};

export default StockDetailsWithItems;