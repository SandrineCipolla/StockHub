import React, {useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import StockDetails from "./StockDetails.tsx";
import StockItems from "./StockItems.tsx";
import AddStockItem from "./AddStockItem.tsx";
import {StockItemsProvider} from "../contexts/StockItemsContext.tsx";
import {Fab, Paper, Tooltip} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import {Theme} from '@mui/material/styles';

const StockDetailsWithItems: React.FC = () => {
    const {ID} = useParams<{ ID: string }>();
    const numericID = Number(ID);
    const navigate = useNavigate();
    const addStockItemRef = useRef<{ handleShowForm: () => void } | null>(null);

    return (
        <StockItemsProvider>

            {/* Bandeau */}
            <Paper
                elevation={1}
                sx={{
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    backgroundColor: 'primary.main', // Changer pour utiliser la couleur principale
                    color: 'primary.contrastText', // Texte clair pour contraster avec le fond
                    borderRadius: '0',
                    marginBottom: 2,
                    position: 'sticky',
                    top: 88,
                    zIndex: 500,
                    height: '88px',
                    borderBottom: (theme: Theme) => `3px solid ${theme.palette.secondary.main}`,
                }}
            >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {/* Bouton Accueil */}
                    <Tooltip title="Retour à l'accueil" aria-label="home">
                        <Fab
                            color="secondary"
                            onClick={() => navigate('/')}
                            size="small"
                            sx={{
                                backgroundColor: 'white',
                                color: 'rgba(90, 33, 181, 0.8)',
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

                    {/* Bouton Retour aux stocks */}
                    <Tooltip title="Retour aux stocks" aria-label="back-to-stocks">
                        <Fab
                            color="secondary"
                            onClick={() => navigate('/stocks')}
                            size="small"
                            sx={{
                                backgroundColor: 'white',
                                color: 'rgba(90, 33, 181, 0.8)',
                                '&:hover': {
                                    boxShadow: '0px 4px 15px rgba(255, 255, 255, 0.5)',
                                    backgroundColor: 'white',
                                    transform: 'scale(1.05)',
                                },
                                transition: 'transform 0.3s, box-shadow 0.3s',
                            }}
                        >
                            <ArrowBackIcon/>
                        </Fab>
                    </Tooltip>
                </div>

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

            {/* Ajout de StockItem avec la référence */}
            <AddStockItem ref={addStockItemRef} stockID={numericID}/>

            {/* Liste des articles stockés */}
            <StockItems ID={ID}/>
        </StockItemsProvider>
    );
};

export default StockDetailsWithItems;
