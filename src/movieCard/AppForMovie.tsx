import React, {ChangeEvent, useEffect, useState} from 'react';
import {movieAPI, MovieType} from "./movie-api";
import {MovieCard} from "./MovieCard";
import s from './appForMovie.module.css'
import {Header} from "./header/Header";
import SuperSelect from "../components/SuperSelect/SuperSelect";
import {fetchMoviesTC, GenresType, RatingType} from "./state/movie-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "./state/store";

const genres: GenresType[] = ['all', 'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'Film Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance',
    'Sci-Fi', 'Short', 'Sport', 'Superhero', 'Thriller', 'War', 'Western']

// const sortVariants: Array<string> = ['title', 'year', 'rating', 'peers', 'seeds', 'download_count', 'like_count', 'date_added']
const ratingVariants: RatingType[] = ['all', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0']

export const AppForMovie = () => {
    const movies = useSelector<AppRootStateType, Array<MovieType>>(state => state.movie)
    const status = useAppSelector((state) => state.app.status)
    // let [movie, setMovie] = useState<MovieType[] | null>(null)
    const [value, setValue] = useState('')
    const [variantOfGenres, setVariantOfGenres] = useState(genres[0])
    // const [sortVariant, setSortVariants] = useState(sortVariants[0])
    const [rating, setRating] = useState(ratingVariants[0])
    const [filters, setFilters] = useState({
        variantOfGenres,
        rating,

    })
    const dispatch = useDispatch()


    // const [filters, setFilters] = useState({
    //     title: null,
    //     rating: null
    // })
    //
    // const onChangeHandler = (filterName: string, value: any) => {
    //     const updatedFilters = {...filters, [fitlerName]: value}
    //     setFilters(updatedFilters)
    //     dispatch(getFilms(updatedFilters))
    // }
    //
    //
    // useEffect(() => {
    //     dispatch(getFilms(films))
    // }, [filters])

    // const RoyalHandleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    //     let value = e.currentTarget.value
    //     const updatedFilters = {...filters, [variantOfGenres]: value,...filters,[rating]:value}
    //     console.log(updatedFilters)
    //     setFilters(updatedFilters)
    //     movieAPI.getMovieWithSort(value)
    //         .then((res) => {
    //             setMovie(res.data.data.movies)
    //         })
    // }

    useEffect(() => {
        dispatch(fetchMoviesTC())
    }, [])
    // console.log(movie)

    // const handleForGenres = (e: ChangeEvent<HTMLSelectElement>) => {
    //     console.log(e.currentTarget.value)
    //     movieAPI.getMovieWithSort(e.currentTarget.value)
    //         .then((res) => {
    //             let filteredMovies = res.data.data.movies?.filter(m => m.title.toLowerCase().includes(value.toLowerCase()))
    //             setMovie(filteredMovies)
    //         })
    // }
    // // const handleForSorting = (e: any) => {
    // //     console.log(e.currentTarget.value)
    // //     movieAPI.getMovieWithSort(e.currentTarget.value)
    // //         .then((res) => {
    // //             setMovie(res.data.data.movies)
    // //
    // //         })
    // // }
    // const handleForRating = (e: ChangeEvent<HTMLSelectElement>) => {
    //     let ratingFromSelect = e.currentTarget.value
    //     console.log(ratingFromSelect)
    //     movieAPI.getMovieWithSort(ratingFromSelect)
    //         .then((res) => {
    //             debugger
    //             let filteredMovies = res.data.data.movies?.filter(m => m.rating.toString().slice(0,1)===ratingFromSelect)
    //           setMovie(filteredMovies)
    //
    //         })
    // }
    // console.log(movie)

    // console.log(sumOfFilms)
    return (
        <div>
            <Header value={value} callBack={setValue}/>

            {/*<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
            {/*    <div >*/}
            {/*        <div style={{marginRight: '5px'}}><p>Genres</p></div>*/}

            {/*        <div>*/}
            {/*            <SuperSelect options={genres}*/}
            {/*                         value={variantOfGenres}*/}
            {/*                         onChange={handleForGenres}*/}
            {/*                         onChangeOption={setVariantOfGenres}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
            {/*        /!*<div>*!/*/}
            {/*        /!*    <div style={{marginRight: '5px'}}><p>Sort by</p></div>*!/*/}

            {/*        /!*    <div>*!/*/}
            {/*        /!*        <SuperSelect options={sortVariants}*!/*/}
            {/*        /!*                     value={sortVariant}*!/*/}
            {/*        /!*                     onChange={handleForSorting}*!/*/}
            {/*        /!*                     onChangeOption={setSortVariants}/>*!/*/}
            {/*        /!*    </div>*!/*/}
            {/*        /!*</div>*!/*/}

            {/*    </div>*/}

            {/*    <div >*/}
            {/*        <div style={{marginRight: '5px'}}><p>Rating</p></div>*/}

            {/*        <div>*/}
            {/*            <SuperSelect options={ratingVariants}*/}
            {/*                         value={rating}*/}
            {/*                         onChange={handleForRating}*/}
            {/*                         onChangeOption={setRating}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <p>Found {movie?.length} results</p>*/}
            {/*</div>*/}
            {status === "loading"
                ? <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:'28px'}}>Is Loading...</p>
                : <section className={s.container}>
                    {movies?.map(m => {
                        return <MovieCard key={m.id} movie={m}/>
                    })}
                </section>
            }

        </div>

    );
};

