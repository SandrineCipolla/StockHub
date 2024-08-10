import React from 'react';
import {Link} from "react-router-dom";


const Home: React.FC = () => {
    return (

        <div>
            <h1>Page produit</h1>
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
