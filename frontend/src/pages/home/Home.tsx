import React from 'react';
import {Link} from "react-router-dom";


const Home: React.FC = () => {
    return (

        <div>
            <h1>Page d'accueil</h1>
            <nav>
                <ul>
                    <li className="mt-4 mb-4 text-violet-300">
                        <Link to="/stocks" className="menu">Mes stocks</Link>
                        <span style={{ margin: '0 10px' }}></span>
                        <Link to="/items" className="menu">Mes produits</Link>
                    </li>
                </ul>
            </nav>


        </div>

    );
};

export default Home;
