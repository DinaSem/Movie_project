import React, {useCallback, useEffect, useState} from 'react';
import {DataType, MovieType} from "./movie-api";
import {MovieCard} from "./MovieCard";
import s from './appForMovie.module.css'
import {Header} from "./header/Header";
import SuperSelect from "../components/SuperSelect/SuperSelect";
import {fetchMoviesTC, GenresType, RatingType, setGenreMovieAC} from "./state/movies-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "./state/store";
import {Pagination} from "./Pagination";



const genres: GenresType[] = ['all', 'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'Film Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance',
    'Sci-Fi', 'Short', 'Sport', 'Superhero', 'Thriller', 'War', 'Western']

// const sortVariants: Array<string> = ['title', 'year', 'rating', 'peers', 'seeds', 'download_count', 'like_count', 'date_added']
// const ratingVariants: RatingType[] = ['all', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0']

export const Home = React.memo(() => {

    const movies = useSelector<AppRootStateType, MovieType[]>(state => state.movies.movies)
    const currentGenreFromState = useSelector<AppRootStateType, GenresType>(state => state.movies.genre)

    const status = useAppSelector((state) => state.app.status)
    const [variantOfGenres, setVariantOfGenres] = useState(genres[0])
    // const [rating, setRating] = useState(ratingVariants[0])
    // const [filters, setFilters] = useState({
    //     variantOfGenres,
    //     rating,
    //
    // })
    // const [sortVariant, setSortVariants] = useState(sortVariants[0])
    // let [movie, setMovie] = useState<MovieType[] | null>(null)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(fetchMoviesTC())
    }, [dispatch,currentGenreFromState,variantOfGenres])

    const handleForGenres = useCallback((option: any) => {
        setVariantOfGenres(option)
        dispatch(setGenreMovieAC(option))
    },[dispatch])

    const onPageChanged = (pageNumber: number) => {
        // console.log("pageNumber: ", pageNumber)
        // dispatch(setCurrentPageTC(pageNumber))
    }

    // console.log('variantOfGenres',variantOfGenres)
    // console.log('genreFromState',currentGenreFromState)
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

    return (
        <div className={s.wrapper}>

            <Header/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div>
                    <div style={{marginRight: '5px', color: "white"}}><p>Genres</p></div>

                        <SuperSelect options={genres}
                                     value={variantOfGenres}
                                     // onChange={handleForGenres}
                                     onChangeOption={handleForGenres}
                        />
                    {/*    <Paginator cardPacksTotalCount={mov.cardPacksTotalCount}*/}
                    {/*               pageCount={mov.pageCount}*/}
                    {/*               pageSize={10}*/}
                    {/*               currentPage={mov.currentPage}*/}
                    {/*               onPageChanged={onPageChanged}*/}
                    {/*               portionSize={undefined}/>*/}

                    {/*</div>*/}
                        <Pagination/>
                </div>
            </div>
            {status === "loading"
                ? <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '28px'}}>Is
                    Loading...</p>
                : <section className={s.container}>
                    {movies?.map(m => {
                        return <MovieCard key={m.id} movie={m}/>
                    })}
                </section>
            }


            {/*<Paginator cardPacksTotalCount={mov.cardPacksTotalCount}*/}
            {/*           pageCount={mov.pageCount}*/}
            {/*           pageSize={10}*/}
            {/*           currentPage={mov.currentPage}*/}
            {/*           onPageChanged={onPageChanged}*/}
            {/*           portionSize={undefined}/>*/}
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


        </div>

    );
})

