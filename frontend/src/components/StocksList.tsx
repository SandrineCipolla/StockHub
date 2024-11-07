import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {deleteStock, fetchStocksList} from "../utils/StockAPIClient.ts";
import {Stock} from "../dataModels.ts";
import AddStock from "./AddStock.tsx";
import {AuthenticatedTemplate} from "@azure/msal-react";
import {Fab, Paper, Tooltip, Typography} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home'; // Icône pour l'accueil
import AddIcon from '@mui/icons-material/Add'; // Icône pour ajouter
import DeleteIcon from '@mui/icons-material/Delete';

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

    const handleStockDelete = async (stockID: number) => {
        if (stocks && window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteStock(stockID);
                setStocks(stocks.filter(stock => stock.id !== stockID)); // Met à jour l'état pour supprimer le stock de la liste
            } catch (error) {
                console.error('Error deleting stock:', error);
            }
        }
    };
    return (
        <AuthenticatedTemplate>
            {/* Bandeau en haut avec le bouton accueil à gauche, texte au centre, et bouton ajout à droite */}
            <Paper
                elevation={1}
                sx={{
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    // backgroundColor: 'rgba(90, 33, 181, 0.8)',
                    // color: 'white',
                    backgroundColor: 'primary.main', // Changer pour utiliser la couleur principale
                    color: 'primary.contrastText', // Texte clair pour contraster avec le fond
                    borderRadius: '0',
                    marginBottom: 2,
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
                                boxShadow: '0px 4px 15px rgba(255, 255, 255, 0.5)', // Ombre douce autour du bouton
                                backgroundColor: 'white', // Le fond reste blanc même au hover
                                transform: 'scale(1.05)', // Effet de grossissement
                            },
                            transition: 'transform 0.3s, box-shadow 0.3s', // Transition pour adoucir l'effet
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
                                boxShadow: '0px 4px 15px rgba(255, 255, 255, 0.5)', // Ombre douce autour du bouton
                                backgroundColor: 'white', // Le fond reste blanc même au hover
                                transform: 'scale(1.05)', // Effet de grossissement
                            },
                            transition: 'transform 0.3s, box-shadow 0.3s', // Transition pour adoucir l'effet
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
                                color="error"
                                size="small"
                                onClick={() => handleStockDelete(stock.id)} // Lier le bouton à la fonction de suppression
                                sx={{
                                    position: 'absolute',
                                    bottom: 10,
                                    right: 10,
                                    backgroundColor: 'white',
                                    color: 'error.main',
                                    padding: 0,
                                    '&:hover': {
                                        boxShadow: '0px 4px 15px rgba(255, 255, 255, 0.5)',
                                        backgroundColor: 'white',
                                        transform: 'scale(1.05)',
                                    },
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                }}
                            >
                                <DeleteIcon sx={{ fontSize: '16px' }}/>
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


