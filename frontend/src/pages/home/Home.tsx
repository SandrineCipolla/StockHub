// Home.tsx
import React from 'react';
import {useMsal} from "@azure/msal-react";
import HomeLoggedIn from './HomeLoggedIn';
import HomeLoggedOut from './HomeLoggedOut';
import {Box} from '@mui/material';

const Home: React.FC = () => {
    const {instance} = useMsal();
    const activeAccount = instance.getActiveAccount();

    return (
        <Box
            sx={{
                marginBottom: 0,
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                //justifyContent: 'center',
                justifyContent: 'flex-start',
                height: '100%',
                //background: 'linear-gradient(135deg, #2D2A4A, #5A538A)',
                padding: '20px 0'
            }}
        >
            {activeAccount ? <HomeLoggedIn/> : <HomeLoggedOut/>}
        </Box>
    );
};

export default Home;
