import React from 'react';
import { Box, Typography } from '@mui/material';

const HomeLoggedOut: React.FC = () => {
    return (
        <Box sx={{ paddingTop: '70px', textAlign: 'center' }}>
            <Typography variant="h5" sx={{ marginBottom: '16px',color:'secondary.main' }}>
                Page d'accueil avant connexion
            </Typography>
            <Typography variant="h3" sx={{ marginBottom: '16px' }}>
                Bienvenue sur StockHub, votre appli de gestion de stocks
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                Vous n'êtes pas connecté !
            </Typography>
            <Typography variant="body1">
                Veuillez vous connecter pour accéder à vos stocks et produits.
            </Typography>
        </Box>
    );
};

export default HomeLoggedOut;
