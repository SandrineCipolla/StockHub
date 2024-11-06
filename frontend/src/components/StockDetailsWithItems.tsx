import React, {useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import StockDetails from "./StockDetails.tsx";
import StockItems from "./StockItems.tsx";
import AddStockItem from "./AddStockItem.tsx";
import {StockItemsProvider} from "../contexts/StockItemsContext.tsx";
import {Fab, Paper, Tooltip} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const StockDetailsWithItems: React.FC = () => {
    const {ID} = useParams<{ ID: string }>();
    const numericID = Number(ID);
    const navigate = useNavigate();
    const addStockItemRef = useRef<{ handleShowForm: () => void } | null>(null);


    return (
        <StockItemsProvider>

            {/* Bandeau en haut avec le bouton accueil à gauche, texte au centre, et bouton ajout à droite */}
            <Paper
                elevation={1}
                sx={{
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    backgroundColor: 'rgba(90, 33, 181, 0.8)',
                    color: 'white',
                    borderRadius: '0',
                    marginBottom: 2,
                }}
            >
                {/* Bouton Accueil à gauche */}
                <Tooltip title="Retour aux stocks" aria-label="home">
                    <Fab
                        color="secondary"
                        onClick={() => navigate('/stocks')}
                        size="small"
                        sx={{
                            backgroundColor: 'white',
                            color: 'rgba(90, 33, 181, 0.8)',
                            '&:hover': {
                                boxShadow: '0px 4px 15px rgba(255, 255, 255, 0.5)', // Ombre douce autour du bouton
                                backgroundColor: 'white', // Le fond reste blanc même au hover
                                transform: 'scale(1.05)', // Effet de grossissement
                            },
                            transition: 'transform 0.3s, box-shadow 0.3s', // Transition pour adoucir l'effet
                        }}
                    >
                        <ArrowBackIcon/>
                    </Fab>
                </Tooltip>

                {/* Titre centré */}
                <StockDetails/>

                {/* Bouton Ajouter à droite */}
                <Tooltip title="Ajouter un article" aria-label="add">
                    <Fab
                        color="primary"
                        onClick={() => addStockItemRef.current?.handleShowForm()}
                        size="small"
                        sx={{
                            backgroundColor: 'white',
                            color: 'rgba(90, 33, 181, 0.8)',
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

            {/* Ajout de StockItem avec la référence */}
            <AddStockItem ref={addStockItemRef} stockID={numericID}/>

            {/* Liste des articles stockés */}
            <StockItems ID={ID}/>
        </StockItemsProvider>
    );
};

export default StockDetailsWithItems;