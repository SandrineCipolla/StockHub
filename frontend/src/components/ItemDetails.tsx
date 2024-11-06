import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {deleteStockItem, fetchItemDetails, updateStockItemQuantity} from "../utils/StockAPIClient.ts";
import {ItemWithStockLabel} from "../dataModels.ts";
import {faPlus, faSync, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Fab, Paper, Tooltip, Typography} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ItemDetails: React.FC = () => {
    const {ID} = useParams<{ ID: string }>();
    const itemID = Number(ID);
    const stockID = Number(ID);
    //const [itemDetail, setItemDetail] = useState<Item | null>(null);
    const [itemDetail, setItemDetail] = useState<ItemWithStockLabel | null>(null);
    //const [stockDetail, setStockDetail] = useState<StockDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number | null>(null);
    const navigate = useNavigate();
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchDataInner = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;
            try {
                const itemData = await fetchItemDetails(stockID, itemID);
                const itemWithLabel: ItemWithStockLabel = {
                    ...itemData,
                    stockLabel: itemData.stockLabel || 'No label available', // Valeur par défaut si stockLabel est vide
                };
                setItemDetail(itemWithLabel);
                setQuantity(itemData.QUANTITY);
                //const stockData = await fetchStockDetails(stockID);
                // setStockDetail(stockData);
                setIsLoading(false);

            } catch (err) {
                setError('Failed to fetch item details');
                setIsLoading(false);
            }
        };
        fetchDataInner();
    }, [stockID, itemID]);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    };

    const handleQuantityUpdate = async () => {
        if (!itemDetail || quantity == null) return;
        try {
            await updateStockItemQuantity(itemDetail.STOCK_ID, itemDetail.ID, quantity);
            const updatedItem = await fetchItemDetails(stockID, itemID);
            setItemDetail(updatedItem);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleItemDelete = async () => {
        if (itemDetail && window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteStockItem(itemDetail.STOCK_ID, itemDetail.ID);
                navigate(`/stocks/${itemDetail.STOCK_ID}`);
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!itemDetail) return <div>Item not found.</div>;

    return (
        <div>
            {/* Bandeau en haut avec le bouton accueil à gauche, texte au centre, et bouton retour à droite */}
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
                }}
            >
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    {/* Bouton Accueil à gauche */}
                    <Tooltip title="Retour à l'accueil" aria-label="home">
                        <Fab
                            color="secondary"
                            onClick={() => navigate('/')}
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
                            <HomeIcon/>
                        </Fab>
                    </Tooltip>

                    {/* Bouton Retour aux articles */}
                    <Tooltip title="Retour aux articles" aria-label="back-to-items">
                        <Fab
                            color="secondary"
                            onClick={() => navigate(`/stocks/${itemDetail.STOCK_ID}`)}
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
                            <ArrowBackIcon/>
                        </Fab>
                    </Tooltip>
                </div>

                {/* Titre centré */}
                <Typography variant="h5" sx={{fontWeight: 'bold', fontSize: '1.5rem'}}>
                    {itemDetail.LABEL ? itemDetail.LABEL : 'Détails de l\'article'}
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

            {/* Détails de l'article */}
            <div className="bg-gray-800 bg-opacity-50 border-2 border-violet-300 rounded-lg shadow-md p-6 relative">
                {/* Titre */}
                {/*<h2 className="text-2xl font-bold mb-4">{itemDetail.LABEL}</h2>*/}

                {/* Description */}
                <div className="flex items-center mb-6">
                    <p className="text-violet-400 font-semibold">Description:</p>
                    <p className="text-gray-300 ml-2">{itemDetail.DESCRIPTION}</p>
                </div>

                {/* Quantité et mise à jour */}
                <div className="flex items-center mb-4">
                    <p className="text-violet-400 font-semibold mr-2">Quantité:</p>
                    <div className="flex items-center">
                        <input
                            type="number"
                            value={quantity !== null ? quantity : ''}
                            onChange={handleQuantityChange}
                            className="p-1 border rounded w-16 text-center bg-gray-900 text-white border-gray-600"
                        />
                        <button onClick={handleQuantityUpdate} className="ml-2 p-1 bg-violet-400 text-white rounded">
                            <FontAwesomeIcon icon={faSync}/>
                        </button>
                    </div>
                </div>

                {/*/!* ID du stock (optionnel) *!/*/}
                {/*<p className="text-gray-400 mb-4">Stock ID: {itemDetail.STOCK_ID}</p>*/}

                {/* Nom du stock (discret, en bas à droite) */}
                <div className="absolute bottom-4 right-4 text-gray-400 text-sm italic">
                    Vous êtes dans le stock : {itemDetail ? itemDetail.stockLabel : 'No label available'}
                </div>

                {/* Suppression (bouton poubelle en bas à gauche) */}
                <div className="flex justify-between mt-6">
                    {/* Le bouton poubelle sera sur la gauche */}
                    <div className="flex justify-start">
                        <button
                            onClick={handleItemDelete}
                            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                            aria-label="Supprimer cet article"
                        >
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ItemDetails;

