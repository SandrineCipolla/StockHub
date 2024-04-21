import React from 'react';
import {Link} from "react-router-dom";


const Home: React.FC = () => {
    return (

        <div>
            <h1>Page d'accueil</h1>
            <nav>
                <ul>
                    <li className="mt-4 mb-4 text-violet-300 hover:text-purple-950">
                        <Link to="/stocks">Mes stocks</Link>
                    </li>
                </ul>
            </nav>


        </div>

    );
};

export default Home;
