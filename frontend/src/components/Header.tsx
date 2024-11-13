import React, {useState} from "react";
import {Box, Button, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import {getUsername} from "../utils/msalUtils";
import {useMsal} from "@azure/msal-react";
import {styled} from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from "react-router-dom";

// Styles personnalisés utilisant styled
const StyledBox = styled(Box)(({theme}) => ({
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: '#000000',
    //backgroundColor: 'rgba(34, 34, 34, 0.8)', // Fond semi-transparent
    position: 'sticky',
    top: 0,
    width: '100%',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between', // Assure que les éléments sont bien alignés
    alignItems: 'center', // Centre verticalement les éléments
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
    },
}));

const StyledButton = styled(Button)(({theme}) => ({
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1, 2),
    fontSize: '0.75rem', // Valeur par défaut
    borderRadius: '20px',
    boxShadow: '0px 4px 12px rgba(168, 85, 247, 0.5)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    [theme.breakpoints.up('sm')]: {
        fontSize: '0.875rem', // Valeur pour les écrans plus larges
    },
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        transform: 'scale(1.05)',
        boxShadow: '0px 6px 16px rgba(168, 85, 247, 0.8)',
    },
}));

const Header: React.FC<{ onLogin: () => void }> = ({onLogin}) => {
    const {instance} = useMsal();
    const activeAccount = instance.getActiveAccount();
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Fonction pour extraire la partie avant le "@"
    const getUsernameWithoutDomain = (email: string) => {
        const atIndex = email.indexOf('@');
        return atIndex !== -1 ? email.substring(0, atIndex) : email; // Retourne la partie avant le "@"
    };
    const clearLocalStorage = () => {
        localStorage.removeItem("msal.idtoken");  // Suppression du token d'identité
        localStorage.removeItem("msal.accesstoken"); // Suppression du token d'accès

    };
    const handleLogout = () => {
        clearLocalStorage();
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    };

    const toggleDrawer = (open: boolean) => (event: React.MouseEvent | React.KeyboardEvent) => {
        if (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab') {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <StyledBox>
                <Box sx={{flexGrow: 1, textAlign: 'left'}}>
                    <Typography variant="h3">StockHub</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    {/*  bouton Login/Logout dans le header uniquement sur les écrans larges */}
                    {activeAccount && (
                        <Typography variant="body2" sx={{marginRight: '10px'}}>
                            Bienvenue {getUsernameWithoutDomain(getUsername(instance.getAllAccounts()))}
                        </Typography>
                    )}
                    <Box sx={{display: {xs: 'none', sm: 'flex'}}}>
                        {activeAccount ? (
                            <StyledButton onClick={handleLogout} sx={{marginRight: '16px'}}>
                                <LogoutIcon sx={{marginRight: '4px'}}/>Logout
                            </StyledButton>
                        ) : (
                            <StyledButton onClick={onLogin} sx={{marginRight: '16px'}}>
                                <LoginIcon sx={{marginRight: '4px'}}/>Login
                            </StyledButton>
                        )}
                    </Box>

                    {/* Menu hamburger */}
                    <IconButton onClick={toggleDrawer(true)} edge="end" color="inherit">
                        <MenuIcon/>
                    </IconButton>
                </Box>
            </StyledBox>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '200px',
                        backgroundColor: 'primary.main',
                    },
                }}
            >
                {/* Menu items can be added here */}
                <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}
                     sx={{color: 'white', display: 'flex', flexDirection: 'column', height: '100vh',}}>
                    <Typography variant="h6" sx={{padding: 2}}>Menu</Typography>

                    {/* éléments de menu */}
                    <Divider sx={{borderColor: 'rgba(255, 255, 255, 0.2)'}}/>

                    <List sx={{flexGrow: 1}}>
                        {activeAccount ? (
                            <>
                                <ListItemButton
                                    component={Link}
                                    to="/stocks"
                                    sx={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        // touchAction: 'manipulation',
                                        // userSelect: 'none',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        margin: '5px 0',

                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                                            color: 'white',
                                            textDecoration: 'none',
                                        },

                                        '@media (max-width: 600px)': {
                                            border: '1px solid white',
                                            backgroundColor: 'transparent',
                                            borderRadius: '50px',
                                            '&:active': {
                                                transform: 'scale(0.95)',
                                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                                color: 'white',
                                                textDecoration: 'none',
                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                borderRadius: '50px',
                                            },
                                        },
                                    }}
                                >
                                    <ListItemText primary="Mes stocks"/>
                                </ListItemButton>

                                <ListItemButton
                                    component={Link}
                                    to="/items"
                                    sx={{
                                            color: 'white',
                                            textDecoration: 'none',
                                            // touchAction: 'manipulation',
                                            // userSelect: 'none',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            margin: '5px 0',

                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                                                color: 'white',
                                                textDecoration: 'none',
                                            },

                                            '@media (max-width: 600px)': {
                                                border: '1px solid white',
                                                backgroundColor: 'transparent',
                                                borderRadius: '50px',
                                                '&:active': {
                                                    transform: 'scale(0.95)',
                                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                                    color: 'white',
                                                    textDecoration: 'none',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                    borderRadius: '50px',
                                                },
                                            },
                                        }}
                                >
                                    <ListItemText primary="Mes produits"/>
                                </ListItemButton>

                                <ListItemButton
                                    component={Link}
                                    to="/low-stock-items"
                                    sx={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        // touchAction: 'manipulation',
                                        // userSelect: 'none',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        margin: '5px 0',

                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                                            color: 'white',
                                            textDecoration: 'none',
                                        },

                                        '@media (max-width: 600px)': {
                                            border: '1px solid white',
                                            backgroundColor: 'transparent',
                                            borderRadius: '50px',
                                            '&:active': {
                                                transform: 'scale(0.95)',
                                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                                color: 'white',
                                                textDecoration: 'none',
                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                borderRadius: '50px',
                                            },
                                        },
                                    }}
                                >
                                    <ListItemText primary="Stocks faibles"/>
                                </ListItemButton>

                                <ListItemButton onClick={handleLogout}
                                                sx={{
                                                    color: 'white',
                                                    textDecoration: 'none', // Supprimer le soulignement du lien
                                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                                    margin: '5px 0',

                                                    '&:hover': {
                                                        transform: 'scale(1.05)',
                                                        boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                                                        color: 'white',
                                                        textDecoration: 'none',
                                                    },

                                                    '@media (max-width: 600px)': {
                                                        marginTop: '480px',
                                                        border: '1px solid white', // Bordure blanche visible sur mobile
                                                        backgroundColor: 'transparent', // Fond transparent par défaut
                                                        borderRadius: '50px',
                                                        '&:active': {
                                                            transform: 'scale(0.95)',
                                                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                                            color: 'white',
                                                            textDecoration: 'none',
                                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                            borderRadius: '50px',
                                                        },
                                                    },
                                                    '@media (min-width: 601px)': {
                                                        marginTop: '350px',
                                                    },
                                                }}

                                >
                                    <ListItemText primary="Se déconnecter"/>
                                </ListItemButton>
                            </>
                        ) : (
                            <ListItemButton

                                onClick={onLogin}
                                sx={{
                                    color: 'white',
                                    textDecoration: 'none', // Supprimer le soulignement du lien
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    margin: '5px 0',

                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                                        color: 'white',
                                        textDecoration: 'none',
                                    },

                                    '@media (max-width: 600px)': {
                                        border: '1px solid white', // Bordure blanche visible sur mobile
                                        backgroundColor: 'transparent', // Fond transparent par défaut
                                        borderRadius: '50px',
                                        '&:active': {
                                            transform: 'scale(0.95)',
                                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                            color: 'white',
                                            textDecoration: 'none',
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            borderRadius: '50px',
                                        },
                                    },
                                }}
                            >
                                <ListItemText primary="Se connecter"/>
                            </ListItemButton>
                        )}
                    </List>
                </Box>
            </Drawer>
            <Box sx={{height: '2px', backgroundColor: '#A855F7', marginTop: 3}}/>
        </>
    );
};

export default Header;
