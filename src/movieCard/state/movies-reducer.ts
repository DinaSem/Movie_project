import {movieAPI, MovieType} from "../movie-api";
import {AppReducerType, RequestStatusType, setAppStatusAC} from "./app-reducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type InitialStateType = {
    movies: MovieTypeDomainType[]
    genre:GenresType
    // params:{
    //     // query_term: string,
    //     genre:GenresType
    // }

}

const initialState = {
    movies: [] as MovieTypeDomainType[],
    genre: 'all' as GenresType,
    // params:{
    //     // query_term: '',
    // }

}

export const moviesReducer = (state: InitialStateType = initialState, action: MovieActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-MOVIES":
            return {...state, movies: action.movies.map(m => ({...m, entityStatus: 'idle'}))}
        case "SET-GENRE":{
            debugger
            return {...state, genre: action.genre}
        }
        default:
            return state
    }
}

// actions
export const setMovieAC = (movies: Array<MovieType>) => ({type: 'SET-MOVIES', movies} as const)
export const setGenreMovieAC = (genre: GenresType) => ({type: 'SET-GENRE', genre} as const)



// thunks
export const fetchMoviesTC = () => {
    return (dispatch: Dispatch<MovieActionsType>, getState: () => AppRootStateType) => {

        dispatch(setAppStatusAC('loading'))
        let { genre } = getState().movies;
        movieAPI.getMovie({ genre })
            .then((res) => {

                dispatch(setMovieAC(res))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const searchMoviesTC = (query_term: string) => {
    return (dispatch: Dispatch<MovieActionsType>, getState: () => AppRootStateType) => {

        dispatch(setAppStatusAC('loading'))

        let {genre} = getState().movies;
        // const {query_term} = params
        movieAPI.getMovie({query_term, genre})

            .then((res) => {
                console.log({ res })
                dispatch(setMovieAC(res))

                dispatch(setAppStatusAC('succeeded'))
            })
    }
}


// types
export type SetMovieACType = ReturnType<typeof setMovieAC>;
export type SetGenreMovieACType = ReturnType<typeof setGenreMovieAC>;

type MovieActionsType = SetMovieACType | AppReducerType | SetGenreMovieACType
export type GenresType =
    'all'
    | 'Action'
    | 'Adventure'
    | 'Animation'
    | 'Biography'
    | 'Comedy'
    | 'Crime'
    | 'Documentary'
    | 'Drama'
    | 'Family'
    | 'Fantasy'
    | 'Film Noir'
    | 'History'
    | 'Horror'
    | 'Music'
    | 'Musical'
    | 'Mystery'
    | 'Romance'
    | 'Sci-Fi'
    | 'Short'
    | 'Sport'
    | 'Superhero'
    | 'Thriller'
    | 'War'
    | 'Western';
export type RatingType = 'all' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2' | '1' | '0'
export type MovieTypeDomainType = MovieType & {
    entityStatus: RequestStatusType
}
