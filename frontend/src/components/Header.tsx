import React, { useState } from "react";
import { Box, Button, Typography, Drawer, IconButton } from "@mui/material";
import { getUsername } from "../utils/msalUtils";
import { useMsal } from "@azure/msal-react";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

// Styles personnalisés utilisant styled
const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: '#000000', // Fond semi-transparent
    //backgroundColor: 'rgba(34, 34, 34, 0.8)', // Fond semi-transparent
    position: 'sticky', // Sticky pour garder le header en haut
    top: 0, // Reste en haut de la page
    width: '100%',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between', // Assure que les éléments sont bien alignés
    alignItems: 'center', // Centre verticalement les éléments
}));

const StyledButton = styled(Button)(({ theme }) => ({
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

const Header: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogout = () => {
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
                <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                    <Typography variant="h3">StockHub</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    {activeAccount ? (
                        <>
                            <Typography variant="body2" sx={{ marginRight: '10px' }}>
                                Bienvenue {getUsername(instance.getAllAccounts())}
                            </Typography>
                            <StyledButton onClick={handleLogout} sx={{marginRight: '16px' }}>
                                <LogoutIcon sx={{ marginRight: '4px' }} />Logout</StyledButton>
                        </>
                    ) : (
                        <StyledButton onClick={onLogin} sx={{marginRight: '16px' }}> <LoginIcon sx={{ marginRight: '4px' }} />Login</StyledButton>
                    )}
                    <IconButton onClick={toggleDrawer(true)} edge="end" color="inherit">
                        <MenuIcon />
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
                        backgroundColor: '#EAD8F9',
                    },
                }}
            >
                {/* Menu items can be added here */}
                <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    <Typography variant="h6" sx={{ padding: 2 }}>Menu</Typography>
                    {/* Ajoutez des éléments de menu ici */}
                </Box>
            </Drawer>
            <Box sx={{ height: '2px', backgroundColor: '#A855F7', marginTop: 3 }} />
        </>
    );
};

export default Header;
