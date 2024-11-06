import React from 'react';
import { Link } from "react-router-dom";
import {Box, Paper, Typography} from '@mui/material';
import { EmojiPeople, CheckCircle, Inventory } from '@mui/icons-material';

const HomeLoggedIn: React.FC = () => {
    return (
        <Box sx={{ padding: 0, overflowY: 'auto', width: '100%' }}>
            {/* Bandeau en haut */}

                <Paper
                    elevation={1}
                    sx={{
                        padding: 2,
                        width: '100%', // Prendre toute la largeur
                        //backgroundColor: 'rgba(255, 255, 255, 0.8)', // Couleur de fond blanche avec transparence
                        //backgroundColor: 'primary.main',
                        color: 'text.primary', // Couleur du texte selon le thème
                        borderRadius: '0',
                        marginBottom: 2,
                        marginTop: -1, // Ajustez cette valeur pour remonter le bandeau
                    }}
                >
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <EmojiPeople sx={{ fontSize: 40, marginRight: 1 ,color: 'primary.main'}} />
                        <Typography variant="body2" sx={{ marginRight: 2 }}>Bienvenue dans votre espace de gestion de Stocks</Typography>
                        <CheckCircle sx={{ fontSize: 30, margin: '0 10px', color: 'primary.main' }} />
                        <Inventory sx={{ fontSize: 30, margin: '0 10px',color: 'primary.main' }} />
                    </Box>
                </Paper>

            {/* Cartes board */}
            <Box display="flex" justifyContent="center" flexDirection={{ xs: 'column', sm: 'row' }} flexWrap="wrap" marginTop={4}>
                <Box sx={{ margin: 1, flex: '1 1 auto' }}>
                    <div className="max-w-sm mx-auto bg-white border-2 border-violet-500 rounded-lg shadow-[0_-2px_8px_rgba(255,255,255,0.2),0_2px_8px_rgba(255,255,255,0.2)] hover:shadow-[0_-4px_16px_rgba(255,255,255,0.3),0_4px_16px_rgba(255,255,255,0.3)] transition-shadow duration-200 p-4 my-4 hover:border-violet-400">
                        <Link to="/stocks" style={{ textDecoration: 'none', color: 'primary.main' }}>
                            <Typography variant="body1" sx={{ color: 'primary.main' }}>Mes stocks</Typography>
                        </Link>
                    </div>
                </Box>
                <Box sx={{ margin: 1, flex: '1 1 auto' }}>
                    <div className="max-w-sm mx-auto bg-white border-2 border-violet-500 rounded-lg shadow-[0_-2px_8px_rgba(255,255,255,0.2),0_2px_8px_rgba(255,255,255,0.2)] hover:shadow-[0_-4px_16px_rgba(255,255,255,0.3),0_4px_16px_rgba(255,255,255,0.3)] transition-shadow duration-200 p-4 my-4 hover:border-violet-400">
                        <Link to="/items" style={{ textDecoration: 'none', color: 'primary.main' }}>
                            <Typography variant="body1" sx={{ color: 'primary.main' }}>Mes produits</Typography>
                        </Link>
                    </div>
                </Box>
                <Box sx={{ margin: 1, flex: '1 1 auto' }}>
                    <div className="max-w-sm mx-auto bg-white border-2 border-violet-500 rounded-lg shadow-[0_-2px_8px_rgba(255,255,255,0.2),0_2px_8px_rgba(255,255,255,0.2)] hover:shadow-[0_-4px_16px_rgba(255,255,255,0.3),0_4px_16px_rgba(255,255,255,0.3)] transition-shadow duration-200 p-4 my-4 hover:border-violet-400">
                        <Link to="/low-stock-items" style={{ textDecoration: 'none', color: 'primary.main' }}>
                            <Typography variant="body1" sx={{ color: 'primary.main' }}>Stocks faibles</Typography>
                        </Link>
                    </div>
                </Box>
            </Box>

        </Box>
    );
};

export default HomeLoggedIn;












