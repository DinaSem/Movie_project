import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import { MovieType} from "./movie-api";
import {useDispatch, useSelector} from "react-redux";
import {fetchMovieDetailsTC} from "./state/movie-details-reducer";
import {AppRootStateType, useAppSelector} from "./state/store";
import s from './movieDetails.module.css'

export const MovieDetails = () => {
    const {id} = useParams<'id'>()
const dispatch = useDispatch()
    const movieDetails = useSelector<AppRootStateType, MovieType>(state=>state.details)
    const status = useAppSelector((state) => state.app.status)

    // const [mov, setMov] = useState<MovieType | null>(null)
    useEffect(() => {
        // movieAPI.getMovieDetails(Number(id)).then((res) => {
        //     // @ts-ignore
        //     setMov(res)
        // })
        dispatch(fetchMovieDetailsTC(Number(id)))
    }, [])

console.log('details',movieDetails)
    return (
        <div className={s.wrapper}>
            {status === "loading"
                ? <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:'28px'}}>Is Loading...</p>
                : <section className={s.container} style={{backgroundImage: `url(${movieDetails.background_image})`}}>

                    <div className={s.bigImgWrapper}>
                        <img src={movieDetails.large_cover_image}alt=""/>
                    </div>

                    <div className={s.informationWrapper}>
                        <h1>{movieDetails.title}</h1>
                        <h2>{movieDetails.year}</h2>
                        <div style={{display: 'flex'}}>{movieDetails.genres?.map((g, i) => {
                            return  <h2  key={i}> {g}  </h2>
                        })}</div>
                        <p> Rating: {movieDetails.rating} / 10</p>
                        <p>{movieDetails.description_full}</p>


                    </div>
                </section>

            }
            </div>
                );
            };

