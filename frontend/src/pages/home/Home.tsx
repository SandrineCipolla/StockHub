import React from 'react';
import {Link} from "react-router-dom";


const Home: React.FC = () => {
    return (

        <div>
            <h1>Page d'accueil</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/stocks">Mes stocks</Link>
                    </li>
                </ul>
            </nav>


        </div>

    );
};

export default Home;
