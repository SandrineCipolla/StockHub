import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {fetchStocksList} from "../utils/StockAPIClient.ts";
import {Stock} from "../dataModels.ts";
import AddStock from "./AddStock.tsx";
import {AuthenticatedTemplate} from "@azure/msal-react";
import {Fab, Paper, Tooltip, Typography} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Theme} from "@mui/material/styles";

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

    const handleStockDelete = (stockID: number) => {
        // Redirige l'utilisateur vers la page de confirmation
        navigate('/confirmation', {state: {stockID}});
    };
    return (
        <AuthenticatedTemplate>
            {/* Bandeau  */}
            <Paper
                elevation={1}
                sx={{
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    borderRadius: '0',
                    marginBottom: 2,
                    height: '88px',
                    position: 'sticky',
                    top: 88,
                    zIndex: 500,
                    borderBottom: (theme: Theme) => `3px solid ${theme.palette.secondary.main}`,
                }}
            >
                {/* Bouton Accueil à gauche */}
                <Tooltip title="Retour à l'accueil" aria-label="home">
                    <Fab
                        color="secondary"
                        onClick={() => navigate('/')}
                        size="small"
                        sx={{
                            backgroundColor: 'white',
                            // color: 'rgba(90, 33, 181, 0.8)',
                            color: 'primary.main',
                            '&:hover': {
                                boxShadow: '0px 4px 15px rgba(255, 255, 255, 0.5)',
                                backgroundColor: 'white',
                                transform: 'scale(1.05)',
                            },
                            transition: 'transform 0.3s, box-shadow 0.3s',
                        }}
                    >
                        <HomeIcon/>
                    </Fab>
                </Tooltip>

                {/* Titre centré */}
                <Typography variant="h5" sx={{fontWeight: 'bold', fontSize: '1.5rem'}}>
                    Liste des stocks
                </Typography>

                {/* Bouton Ajouter à droite */}
                <Tooltip title="Ajouter un stock" aria-label="add">
                    <Fab
                        color="primary"
                        onClick={() => addStockRef.current?.handleShowForm()}
                        size="small"
                        sx={{
                            backgroundColor: 'white',
                            color: 'primary.main',
                            '&:hover': {
                                boxShadow: '0px 4px 15px rgba(255, 255, 255, 0.5)',
                                backgroundColor: 'white',
                                transform: 'scale(1.05)',
                            },
                            transition: 'transform 0.3s, box-shadow 0.3s',
                        }}
                    >
                        <AddIcon/>
                    </Fab>
                </Tooltip>
            </Paper>

            {/* Grille pour les cartes de stocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {stocks.map(stock => (
                    <div key={stock.id} className="p-4 bg-gray-800 bg-opacity-50 border border-violet-300 rounded-md text-secondary
                    shadow-[0_-2px_10px_rgba(255,255,255,0.2),0_2px_10px_rgba(255,255,255,0.2)]
                    hover:shadow-[0_-4px_15px_rgba(255,255,255,0.3),0_4px_15px_rgba(255,255,255,0.3)]
                    transition-shadow duration-200 relative">
                        <Link to={`/stocks/${stock.id}`} className="block text-secondary hover:text-white">
                            {stock.label}
                        </Link>

                        {/* Bouton Supprimer */}
                        <Tooltip title="Supprimer le stock" aria-label="delete">
                            <Fab

                                size="small"
                                onClick={() => handleStockDelete(stock.id)}
                                sx={{
                                    position: 'absolute',
                                    bottom: 10,
                                    right: 5,
                                    backgroundColor: 'transparent',
                                    color: 'primary.main',
                                    border: '1px outset',
                                    borderColor: 'rgba(139, 92, 246, 0.8)',
                                    padding: 0,
                                    '&:hover': {
                                        boxShadow: '0px 4px 15px rgba(255, 255, 255, 0.5)',
                                        backgroundColor: 'transparent',
                                        transform: 'scale(1.05)',
                                    },
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    zIndex: 1,
                                }}
                            >
                                <DeleteForeverIcon sx={{fontSize: '20px'}}/>
                            </Fab>
                        </Tooltip>
                    </div>
                ))}
            </div>

            {/* Composant AddStock avec référence */}
            <AddStock ref={addStockRef} onStockAdded={handleStockAdded}/>
        </AuthenticatedTemplate>
    );
};

export default StocksList;


