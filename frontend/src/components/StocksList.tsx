import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {fetchStocksList} from "../utils/StockAPIClient.ts";
import {Stock} from "../dataModels.ts";
import AddStock from "./AddStock.tsx";
import {AuthenticatedTemplate} from "@azure/msal-react";
import {Box, Fab, Paper, Tooltip, Typography} from "@mui/material";


const StocksList: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const navigate = useNavigate();
    const hasFetched = useRef(false);
    const addStockRef = useRef<{ handleShowForm: () => void }>(null);

    const fetchDataInner = async () => {
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
            {/* Bandeau en haut */}
            <Paper
                elevation={1}
                sx={{
                    padding: 3,  // Augmenter le padding pour plus de visibilité
                    width: '100%',
                    backgroundColor: 'rgba(90, 33, 181, 0.8)', // Couleur violette semi-transparente
                    color: 'white',
                    borderRadius: '0',
                    marginBottom: 2,
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="h5" sx={{fontWeight: 'bold', fontSize: '1.5rem', marginRight: 2}}>
                        Liste des stocks
                    </Typography>
                </Box>
            </Paper>

            {/* Grille pour les cartes de stocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {stocks.map(stock => (
                    <div key={stock.id} className="p-4 bg-gray-800 bg-opacity-50 border border-violet-300 rounded-md text-secondary
            shadow-[0_-2px_10px_rgba(255,255,255,0.2),0_2px_10px_rgba(255,255,255,0.2)]
            hover:shadow-[0_-4px_15px_rgba(255,255,255,0.3),0_4px_15px_rgba(255,255,255,0.3)]
            transition-shadow duration-200">
                        <Link to={`/stocks/${stock.id}`} className="block text-secondary hover:text-white">
                            {stock.label}
                        </Link>
                    </div>
                ))}
            </div>

            {/*<AddStock onStockAdded={handleStockAdded} />*/}

            {/*<button*/}
            {/*    className="mt-6 mb-3 px-4 py-2 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-secondary transition duration-200"*/}
            {/*    onClick={() => navigate('/')}*/}
            {/*>*/}
            {/*    Retour à l'accueil*/}
            {/*</button>*/}

            {/* Boutons flottants */}
            <Tooltip title="Ajouter un stock" aria-label="add">
                <Fab
                    color="primary"
                    onClick={() => addStockRef.current?.handleShowForm()}
                    sx={{position: 'fixed', bottom: 16, right: 80}}
                >
                    <span>+</span>
                </Fab>
            </Tooltip>

            <Tooltip title="Retour à l'accueil" aria-label="home">
                <Fab
                    color="secondary"
                    onClick={() => navigate('/')}
                    sx={{position: 'fixed', bottom: 16, right: 16}}
                >
                    <span>🏠</span> {/* Ou tu peux mettre une icône ici */}
                </Fab>
            </Tooltip>
            {/* Composant AddStock avec référence */}
            <AddStock ref={addStockRef} onStockAdded={handleStockAdded}/>


        </AuthenticatedTemplate>

    );
};

export default StocksList;

