import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {movieAPI, MovieType} from "./movie-api";
import s from './movieCard.module.css'

type PropsType = {
    movie: MovieType
}

export const MovieCard = ({movie}: PropsType) => {


    return (

        <Link className={s.movie} to={`details/${movie.id}`}>
            <img src={movie.medium_cover_image} alt={''} className={s.cardsPicture}/>

            <div className={s.textWrapper}>
                <h3 className={s.movieTitle}>{movie.title}</h3>
                <h5 className={s.movieYear}>{movie.year}</h5>
                <h5 className={s.movieYear}>{movie.rating} / 10</h5>

                <div>{movie.genres?.map((g,i) => {
                    return <span key={i}> {g}</span>
                })}</div>
                <p>{movie.summary.slice(0, 140)}...</p>
            </div>
        </Link>


    );
};

