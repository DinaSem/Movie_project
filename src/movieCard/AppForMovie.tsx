import React from 'react';
import {Navigate, Route, Routes, useParams} from "react-router-dom";
import {Home} from "./Home";
import {About} from "./About";
import {Navbar} from "./Navbar";
import {MovieDetails} from "./MovieDetails";
import s from './appForMovie.module.css'

const AppForMovie = () => {

    return (
        <div className={s.wrapper}>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='about' element={<About/>}/>
                <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                <Route path='*' element={<Navigate to='/404'/>} />
                <Route path='details/:id' element={<MovieDetails />} />

            </Routes>
        </div>
    );
};

export default AppForMovie;