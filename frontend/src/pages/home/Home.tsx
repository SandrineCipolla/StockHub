import React from 'react';
import { useMsal } from "@azure/msal-react";
import HomeLoggedIn from './HomeLoggedIn';
import HomeLoggedOut from './HomeLoggedOut';

const Home: React.FC = () => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    return (
        <div>
            {activeAccount ? <HomeLoggedIn /> : <HomeLoggedOut />}
        </div>
    );
};

export default Home;