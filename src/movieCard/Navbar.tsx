import React from 'react';
import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
        <div>
            <nav>
                <Link to={{pathname:'/'}}>Главная</Link>
                <Link to={'/404'}>Ошибка</Link>
            </nav>

        </div>
    );
};

