import React from 'react';
import {Link} from "react-router-dom";
import {useMsal} from "@azure/msal-react";
import { getUsername } from '../../utils/msalUtils';


const Home: React.FC = () => {
    const msalInstance = useMsal();
    return (

        <div>

            <h1>Page d'accueil</h1>
            <h2>Bienvenue {getUsername(msalInstance.accounts)}</h2>
            <nav>
                <ul>
                    <li className="nav-item">
                        <Link to="/stocks" className="menu">Mes stocks</Link>
                        <span className="separator"></span>
                        <Link to="/items" className="menu">Mes produits</Link>
                    </li>
                </ul>
            </nav>


        </div>

    );
};

export default Home;
