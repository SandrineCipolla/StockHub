import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography, Paper } from '@mui/material';
import { deleteStockItem } from "../utils/StockAPIClient.ts";

const ItemConfirmationPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Récupérer les ID du stock et de l'item passés via l'état de la navigation
    const { stockID, itemID } = location.state || {};
    console.log('stockID:', stockID); // Log du stockID
    console.log('itemID:', itemID);   // Log de itemID
    if (!stockID || !itemID) {
        navigate('/'); // Si les ID ne sont pas passés, rediriger vers la page d'accueil
    }

    const handleConfirm = async () => {
        try {
            console.log(`Suppression de l'item avec l'ID ${itemID} du stock ${stockID}`);
            await deleteStockItem(stockID, itemID); // Effectue la suppression
            navigate(`/stocks/${stockID}`); // Redirige vers la liste des stocks après confirmation
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'item:', error);
        }
    };

    const handleCancel = () => {
        navigate(`/stocks/${stockID}`); // Annule la suppression et retourne à la liste des stocks
    };

    return (
        <Paper sx={{ padding: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                Êtes-vous sûr de vouloir supprimer cet item ? Cette action est irréversible.
            </Typography>
            <Button variant="contained" color="error" onClick={handleConfirm} sx={{ marginRight: 2 }}>
                Confirmer
            </Button>
            <Button variant="outlined" color="primary" onClick={handleCancel}>
                Annuler
            </Button>
        </Paper>
    );
};

export default ItemConfirmationPage;

