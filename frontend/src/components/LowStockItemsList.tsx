import React, {useEffect, useRef, useState} from 'react';
import {fetchLowStockItems} from '../utils/StockAPIClient';
import {ItemWithStockLabel} from "../dataModels.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom";
import {Fab, Paper, Tooltip, Typography} from "@mui/material";
import {Theme} from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const LowStockItemsList: React.FC = () => {
    const [lowStockItems, setLowStockItems] = useState<ItemWithStockLabel[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const hasFetched = useRef(false);

    const fetchData = async () => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        try {
            const data = await fetchLowStockItems();
            console.log('Données des articles à faible stock:', data);

            setLowStockItems(data as ItemWithStockLabel[]);
        } catch (error) {
            console.error('Erreur lors de la récupération des stocks faibles', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <p>Chargement...</p>;
    }


    return (

        <div className="flex flex-col items-center w-full p-10">
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
                    Articles à faible stock
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

            {/*{lowStockItems.length === 0 ? (*/}
            {/*    <p>Aucun article à faible stock trouvé.</p>*/}
            {/*) : (*/}
            {/*    <ul className="w-full">*/}
            {/*        <li className="flex items-center mb-4 p-4 border-b border-gray-300 pl-4 font-bold">*/}
            {/*            <p className="w-1/3 ml-30">Item</p>*/}
            {/*            <p className="w-1/3 ml-30">Quantité</p>*/}
            {/*            <p className="w-1/3 ml-30">Stock</p>*/}
            {/*        </li>*/}
            {/*        {lowStockItems.map((item) => (*/}
            {/*            <li key={item.ID} className="flex items-center mb-4 p-4 border-b border-gray-300 pl-4">*/}
            {/*                <p className="w-1/3 font-bold text-purple-600 hover:text-violet-300 ml-30">*/}
            {/*                    <Link to={`/stocks/${item.STOCK_ID}/items/${item.ID}`}*/}
            {/*                          className="text-purple-600 hover:text-violet-300">*/}
            {/*                        {item.LABEL}*/}
            {/*                    </Link>*/}
            {/*                </p>*/}
            {/*                <p className="w-1/3 ml-30 ">{item.QUANTITY} en stock</p>*/}
            {/*                <p className="w-1/3 ml-30">*/}
            {/*                    <Link to={`/stocks/${item.STOCK_ID}`} className="text-purple-600 hover:text-violet-300">*/}
            {/*                        {item.stockLabel}*/}
            {/*                    </Link>*/}
            {/*                </p>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}

            {/*)}*/}
            {/* Grille pour les articles à faible stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {lowStockItems.length === 0 ? (
                    <p>Aucun article à faible stock trouvé.</p>
                ) : (
                    lowStockItems.map((item) => (
                        <div key={item.ID} className="p-4 bg-gray-800 bg-opacity-50 border border-violet-300 rounded-md text-secondary
            shadow-[0_-2px_10px_rgba(255,255,255,0.2),0_2px_10px_rgba(255,255,255,0.2)]
            hover:shadow-[0_-4px_15px_rgba(255,255,255,0.3),0_4px_15px_rgba(255,255,255,0.3)]
            transition-shadow duration-200 relative">
                            {/*<p className="text-purple-600 font-bold hover:text-violet-300">*/}
                            {/* Lien vers l'article */}
                            <Link to={`/stocks/${item.STOCK_ID}/items/${item.ID}`}
                                  className="block text-secondary hover:text-white">
                                {item.LABEL}
                            </Link>
                            {/*</p>*/}
                            <p className="text-gray-400">{item.QUANTITY} en stock</p>
                            <p className="text-gray-500">
                                {/* Lien vers le stock associé */}
                                <Link to={`/stocks/${item.STOCK_ID}`} className="block text-secondary hover:text-white">
                                    {item.stockLabel}
                                </Link>
                            </p>
                        </div>
                    ))
                )}
            </div>


        </div>
    );
};

export default LowStockItemsList;