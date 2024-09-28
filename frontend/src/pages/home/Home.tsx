import React from 'react';
import { useMsal } from "@azure/msal-react";
import HomeLoggedIn from './HomeLoggedIn';
import HomeLoggedOut from './HomeLoggedOut';
import { Box } from '@mui/material';

const Home: React.FC = () => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    return (
        <Box sx={{ marginBottom:25 }}> {/* 4 correspond à 32px */}
            {activeAccount ? <HomeLoggedIn /> : <HomeLoggedOut />}
        </Box>
    );
};

export default Home;