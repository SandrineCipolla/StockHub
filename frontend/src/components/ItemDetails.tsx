import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchItemDetails, updateStockItemQuantity} from "../utils/StockAPIClient.ts";
import {ItemWithStockLabel} from "../dataModels.ts";
import {faPlus, faSync, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Fab, Paper, Tooltip, Typography} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Theme} from "@mui/material/styles";

const ItemDetails: React.FC = () => {
    const {STOCKID,ITEMID} = useParams<{ STOCKID: string ,ITEMID:string}>();
    const itemID = Number(ITEMID);
    const stockID = Number(STOCKID);
    const [itemDetail, setItemDetail] = useState<ItemWithStockLabel | null>(null);
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
                    stockLabel: itemData.stockLabel || 'No label available',
                };
                setItemDetail(itemWithLabel);
                setQuantity(itemData.QUANTITY);
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

    const handleItemDelete = (stockID: number, itemID: number) => {
        navigate('/item-confirmation', {state: {stockID, itemID}});
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!itemDetail) return <div>Item not found.</div>;

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
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    borderRadius: '0',
                    marginBottom: 2,
                    height: '88px',
                    borderBottom: (theme: Theme) => `3px solid ${theme.palette.secondary.main}`,
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

                {/* Description */}
                <div className="flex items-center mb-6">
                    <p className="text-violet-500 font-semibold">Description:</p>
                    <p className="text-gray-300 ml-2">{itemDetail.DESCRIPTION}</p>
                </div>

                {/* Quantité et mise à jour */}
                <div className="flex items-center mb-4">
                    <p className="text-violet-500 font-semibold mr-2">Quantité:</p>
                    <div className="flex items-center">
                        <input
                            type="number"
                            value={quantity !== null ? quantity : ''}
                            onChange={handleQuantityChange}
                            className="p-1 border rounded w-16 text-center bg-gray-900 text-white border-gray-600"
                        />
                        <button onClick={handleQuantityUpdate}
                                className="ml-4 p-2 bg-violet-700 text-white rounded-lg shadow transition duration-300 ease-in-out transform hover:bg-violet-600 hover:scale-105 hover:shadow-[0px_0px_15px_5px_rgba(255,255,255,0.5)]">
                            <FontAwesomeIcon icon={faSync}/>
                        </button>
                    </div>
                </div>

                {/* Nom du stock (discret, en bas à droite) */}
                <div className="absolute bottom-4 right-4 text-gray-400 text-sm italic">
                    Vous êtes dans le stock : {itemDetail ? itemDetail.stockLabel : 'No label available'}
                </div>

                {/*</div>*/}
                {/* Bouton Poubelle en haut à droite */}
                <Tooltip title="Supprimer cet article" aria-label="delete-item">
                    <Fab
                        color="secondary"
                        onClick={() => handleItemDelete(stockID,itemID)}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 5,
                            backgroundColor: 'transparent',
                            color: 'primary.main',
                            border: '1px outset',
                            borderColor: 'rgba(139, 92, 246, 0.8)',
                            '&:hover': {
                                boxShadow: '0px 4px 15px rgba(255, 255, 255, 0.5)',
                                backgroundColor: 'transparent',
                                transform: 'scale(1.05)',
                            },
                            transition: 'transform 0.3s, box-shadow 0.3s',
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </Fab>
                </Tooltip>
            </div>

        </div>
    );
};

export default ItemDetails;

