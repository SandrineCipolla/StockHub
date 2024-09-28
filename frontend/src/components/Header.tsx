import React, {useState} from "react";
import { Box, Button, Typography, Drawer, IconButton } from "@mui/material"
import {getUsername} from "../utils/msalUtils.ts";
import {useMsal} from "@azure/msal-react";
import {styled} from '@mui/material/styles';
import MenuIcon from "@mui/icons-material/Menu";

// Styles personnalisés utilisant styled
const StyledBox = styled(Box)(({theme}) => ({
   // backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    color: theme.palette.common.white,
}));

const StyledButton = styled(Button)(({theme}) => ({
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(0.5,1),
    fontSize: '0.75rem',
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const Header: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const {instance} = useMsal();
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
    const menuItems = (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{ textAlign: 'center' }}
        >
            <Typography variant="h6" sx={{ padding: 2 }}>
                Menu
            </Typography>
            {/* Ajouter le menu */}
        </Box>
    );

    return (
        <>
            <StyledBox display="flex" justifyContent="space-between" alignItems="center">
                <Box sx={{flexGrow: 1, textAlign:'left'}}>
                    <Typography variant="h3">
                    StockHub
                     </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    {activeAccount ? (
                        <>
                            <Typography variant="body2" sx={{marginRight: '10px'}}>
                                Bienvenue {getUsername(instance.getAllAccounts())}
                            </Typography>
                            <StyledButton onClick={handleLogout}>Logout</StyledButton>
                        </>
                    ) : (
                        <StyledButton onClick={onLogin}>Login</StyledButton>
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
                {menuItems}
            </Drawer>
            {/* Ligne de séparation */}
            <Box sx={{ height: '2px', backgroundColor: '#A855F7', marginTop:3 }} />
        </>
    );
};

export default Header;

