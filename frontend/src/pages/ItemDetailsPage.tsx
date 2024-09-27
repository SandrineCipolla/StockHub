import React from 'react';
import { useMsal } from "@azure/msal-react";
import HomeLoggedIn from '../../src/pages/home/HomeLoggedIn';
import HomeLoggedOut from '../../src/pages/home/HomeLoggedOut';

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