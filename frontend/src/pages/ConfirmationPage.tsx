import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography, Paper } from '@mui/material';
import {deleteStock} from "../utils/StockAPIClient.ts";

const ConfirmationPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Récupérer l'ID du stock passé via l'état de la navigation
    const stockID = location.state?.stockID;

    if (!stockID) {
        navigate('/'); // Si aucune ID n'est passée, rediriger vers la page d'accueil
    }

    const handleConfirm = async () => {
        try {
            await deleteStock(stockID); // Effectue la suppression
            navigate('/stocks'); // Redirige vers la liste des stocks après confirmation
        } catch (error) {
            console.error('Erreur lors de la suppression du stock:', error);
        }
    };

    const handleCancel = () => {
        navigate('/stocks'); // Annule la suppression et retourne à la liste des stocks
    };

    return (
        <Paper sx={{ padding: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                Êtes-vous sûr de vouloir supprimer ce stock ? Cette action est irréversible.
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

export default ConfirmationPage;
