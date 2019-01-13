import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (


        <div className="nav">
       
            <Link to="/home">
                <h2 className="nav-title">Mia+Pollywog</h2>
            </Link>
            <div className="nav-right">
                <Link to="/home">
                    <h2 className="nav-link">Find Art</h2>
                </Link>
                <Link to="/fav">
                    <h2 className="nav-link">Favorites</h2>
                </Link>
            </div>
        </div>

);

export default Header;
