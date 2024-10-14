import React from 'react';
import {Link} from "react-router-dom";

import {Box, Typography} from '@mui/material';


const HomeLoggedIn: React.FC = () => {

    return (
        <Box sx={{marginTop: 4}}> {/* 4 correspond à un espacement de 32px */}
            <Typography variant="h6" marginBottom={3}>Page d'accueil après connexion</Typography>
            <Typography variant="body1">Bienvenue dans votre espace de gestion de Stocks</Typography>
            <nav>
                <ul>
                    <li className="nav-item">
                        <Link to="/stocks" className="menu">Mes stocks</Link>
                        <span className="separator"></span>
                        <Link to="/items" className="menu">Mes produits</Link>
                        <span className="separator"></span>
                        <Link to="/low-stock-items" className="menu">Stocks faibles</Link>
                    </li>
                </ul>
            </nav>
        </Box>
    );
};

export default HomeLoggedIn;
