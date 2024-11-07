import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {fetchItemsList} from "../utils/StockAPIClient.ts";
import {Item} from "../dataModels.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import {Fab, Paper, Tooltip, Typography} from "@mui/material";
import {Theme} from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import {faPlus} from "@fortawesome/free-solid-svg-icons";


const ItemsList: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const navigate = useNavigate();
    const hasFetched = useRef(false);

    const fetchDataInner = async () => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        try {
            const data = await fetchItemsList();
            console.info('JSON data recovered itemslist:', data);
            setItems(data);
        } catch (error) {
            console.error('Error in recovering inventory', error);
        }
    };

    useEffect(() => {
        fetchDataInner();
    }, []);


    return (
        <div>
            {/* Bandeau  */}
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
                    Liste des produits
                </Typography>

                {/* Bouton Ajouter à droite */}
                <Tooltip
                    title="Ajouter des infos (actuellement inactif)"
                    aria-label="add-info"
                    disableInteractive // Permet un meilleur contrôle du Tooltip avec des éléments désactivés
                    disableHoverListener={false}
                    disableFocusListener={false}
                >
                     <span> {/* le <span> entoure le Fab désactivé */}
                         <Fab
                             color="secondary"
                             onClick={() => {/* Logique d'ajout d'infos */
                             }}
                             size="small"
                             disabled
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
            <FontAwesomeIcon icon={faPlus}/>
        </Fab>
    </span>
                </Tooltip>
            </Paper>

            {/* Grille pour les cartes de stocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {items.map(item => (
                    <div key={item.ID} className="p-4 bg-gray-800 bg-opacity-50 border border-violet-300 rounded-md text-secondary
                    shadow-[0_-2px_10px_rgba(255,255,255,0.2),0_2px_10px_rgba(255,255,255,0.2)]
                    hover:shadow-[0_-4px_15px_rgba(255,255,255,0.3),0_4px_15px_rgba(255,255,255,0.3)]
                    transition-shadow duration-200 relative">
                        {/*<Link to={`/items/${item.ID}`} className="block text-secondary hover:text-white">*/}
                        {item.LABEL}
                        {item.isLowStock && (
                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 ml-2"/>
                        )}
                        {/*</Link>*/}

                        {/*/!* Bouton Supprimer *!/*/}
                        {/*<Tooltip title="Supprimer le stock" aria-label="delete">*/}
                        {/*    <Fab*/}
                        {/*        //color="error"*/}
                        {/*        size="small"*/}
                        {/*        onClick={() => handleStockDelete(stock.id)} // Lier le bouton à la fonction de suppression*/}
                        {/*        sx={{*/}
                        {/*            position: 'absolute',*/}
                        {/*            bottom: 10,*/}
                        {/*            right: 5,*/}
                        {/*            backgroundColor: 'transparent',*/}
                        {/*            color: 'primary.main',*/}
                        {/*            border: '1px outset',*/}
                        {/*            borderColor: 'rgba(139, 92, 246, 0.8)',*/}
                        {/*            padding: 0,*/}
                        {/*            '&:hover': {*/}
                        {/*                boxShadow: '0px 4px 15px rgba(255, 255, 255, 0.5)',*/}
                        {/*                backgroundColor: 'transparent',*/}
                        {/*                transform: 'scale(1.05)',*/}
                        {/*            },*/}
                        {/*            transition: 'transform 0.3s, box-shadow 0.3s',*/}
                        {/*            zIndex: 1,*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        <DeleteForeverIcon sx={{fontSize: '20px'}}/>*/}
                        {/*    </Fab>*/}
                        {/*</Tooltip>*/}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ItemsList;
