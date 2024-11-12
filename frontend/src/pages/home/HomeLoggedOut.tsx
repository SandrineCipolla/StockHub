import React from 'react';
import { Paper, Typography } from '@mui/material';
import { EmojiPeople, Lock, Inventory } from '@mui/icons-material';

const HomeLoggedOut: React.FC = () => {
    return (
        <Paper
            elevation={3}
            className="slide-in mx-auto max-w-md text-center bg-white rounded-lg p-4 shadow-md transition-shadow duration-300 ease-in-out"
            sx={{
                paddingTop: '70px',
                textAlign: 'center',
                maxWidth: '600px',
                margin: '0 auto',
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: 4,
                border: '2px solid transparent',
                transition: 'box-shadow 0.3s ease, border 0.3s ease, background-color 0.3s ease',
                '&:hover': {
                    boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.5)',
                    border: '2px solid rgba(90, 33, 181, 0.7)',
                },
            }}
        >
            <EmojiPeople sx={{ fontSize: 50, color: 'primary.main', marginBottom: 2 }} />
            <Typography variant="h3" sx={{ marginBottom: '16px', color: 'primary.main', fontWeight: 'bold' }}>
                Bienvenue sur StockHub
            </Typography>
            <Typography variant="h5" sx={{ marginBottom: '16px', color: 'secondary.main' }}>
                Votre solution de gestion de stocks
            </Typography>
            <div className="flex justify-center mb-4">
                <Lock sx={{ fontSize: 30, color: 'primary.main', margin: '0 10px' }} />
                <Inventory sx={{ fontSize: 30, color: 'primary.main', margin: '0 10px' }} />
            </div>
            <Typography variant="body1" sx={{ marginBottom: '16px', color: 'text.secondary' }}>
                Connectez-vous depuis  <strong className="font-bold text-primary">LOGIN</strong> pour accéder à vos stocks et produits.
            </Typography>
        </Paper>
    );
};

export default HomeLoggedOut;



