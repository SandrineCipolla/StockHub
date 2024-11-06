import React, {useContext, useEffect, useRef} from 'react';
import {fetchStockItems} from "../utils/StockAPIClient.ts";
import {StockItemsContext} from "../contexts/StockItemsContext.tsx";
import {StockItemsProps} from "../frontModels.ts";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import {Box, Card, CardContent, Typography} from "@mui/material";


const StockItems: React.FC<StockItemsProps> = ({ID}) => {
    const numericID = Number(ID);
    const {stockItems, setStockItems} = useContext(StockItemsContext);
    const hasFetched = useRef(false);

    const fetchDataInner = async () => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        try {
            const data = await fetchStockItems(numericID);
            if (setStockItems) {
                setStockItems(data);
            }
        } catch (error) {
            console.error('Error in recovering stock items', error);
        }
    };

    useEffect(() => {
        fetchDataInner();
    }, [ID, numericID, stockItems]);


    if (!stockItems) {
        return <div>Loading...</div>;
    }
    if (stockItems.length === 0) {
        return <div className="mt-5 mb-5">
            Your stock is empty. Please add items.
        </div>;
    }


    return (
        <Box className="p-10 space-y-6">
            {/* Grid header */}
            <Box className="grid grid-cols-4 gap-4 mb-5 w-full">
                <Typography variant="h6" className="font-bold">N°</Typography>
                <Typography variant="h6" className="font-bold">Label</Typography>
                <Typography variant="h6" className="font-bold">Quantity</Typography>
                <Typography variant="h6" className="font-bold">Details</Typography>
            </Box>

            {/* Stock items list */}
            {stockItems.map((item, index) => (
                <Card key={item.ID} className="!bg-gray-800 !bg-opacity-50 border border-violet-300 rounded-lg text-violet-500
    shadow-[0_-2px_10px_rgba(255,255,255,0.2),0_2px_10px_rgba(255,255,255,0.2)]
    hover:shadow-[0_-4px_15px_rgba(255,255,255,0.3),0_4px_15px_rgba(255,255,255,0.3)]
    hover:text-white transition-shadow duration-200">
                    <CardContent className="grid grid-cols-4 gap-4 p-5">
                        {/* N° */}
                        <Typography variant="body1" className="font-medium text-violet-500">{index + 1}</Typography>

                        {/* Label */}
                        <Typography variant="body1" className="text-violet-500">{item.LABEL}</Typography>

                        {/* Quantity with icon if low stock */}
                        <Box className="flex items-center justify-center space-x-2">
                            <Typography variant="body1" className="font-semibold text-violet-500">{item.QUANTITY}</Typography>
                            {item.isLowStock && (
                                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500" />
                            )}
                        </Box>

                        {/* Details link */}
                        <Box className="flex justify-center items-center">
                            <Link to={`/stocks/${item.STOCK_ID}/items/${item.ID}`} className="block text-violet-500 hover:text-white">
                                <FontAwesomeIcon icon={faSearch} />
                            </Link>
                        </Box>
                    </CardContent>
                </Card>

            ))}
        </Box>
    );
};

export default StockItems;