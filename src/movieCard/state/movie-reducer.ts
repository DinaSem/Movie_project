import {movieAPI, MovieType} from "../movie-api";
import {AppReducerType, RequestStatusType, setAppStatusAC} from "./app-reducer";
import {Dispatch} from "redux";


const initialState: MovieTypeDomainType[] = []

export const movieReducer = (state: MovieTypeDomainType[] = initialState, action: MovieActionsType): MovieTypeDomainType[] => {
    switch (action.type) {
        case "SET-MOVIES":
            return action.movies.map(m=>({...m,entityStatus:'idle'}))
        // case 'REMOVE-TODOLIST':
        //     return state.filter(tl => tl.id !== action.id)
        // case 'ADD-TODOLIST':
        //     return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        // case 'CHANGE-TODOLIST-TITLE':
        //     return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        // case 'CHANGE-TODOLIST-FILTER':
        //     return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        // case 'SET-TODOLISTS':
        //     return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        // case "CHANGE-TODOLIST-ENTITY-STATUS":
        //     return state.map(tl => tl.id === action.id ? {...tl,entityStatus:'loading'} : tl)
        default:
            return state
    }
}

// actions
export const setMovieAC = (movies: Array<MovieType>) => ({type: 'SET-MOVIES', movies} as const)

// export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
// export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
// export const changeTodolistTitleAC = (id: string, title: string) => ({
//     type: 'CHANGE-TODOLIST-TITLE',
//     id,
//     title
// } as const)
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
//     type: 'CHANGE-TODOLIST-FILTER',
//     id,
//     filter
// } as const)
// export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
//
// export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
//     return {
//         type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status
//     } as const
// }


// thunks
export const fetchMoviesTC = () => {
    return (dispatch: Dispatch<MovieActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        movieAPI.getMovieWithSort()
            .then((res) => {
                dispatch(setMovieAC(res))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
// export const removeTodolistTC = (todolistId: string) => {
//     return (dispatch: Dispatch<ActionsType>) => {
//         dispatch(setAppStatusAC('loading'))
//         dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
//         todolistsAPI.deleteTodolist(todolistId)
//             .then((res) => {
//                 dispatch(removeTodolistAC(todolistId))
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//     }
// }
// export const addTodolistTC = (title: string) => {
//     return (dispatch: Dispatch<ActionsType>) => {
//         dispatch(setAppStatusAC('loading'))
//         todolistsAPI.createTodolist(title)
//             .then((res) => {
//
//                 if (res.data.resultCode === 0) {
//                     dispatch(addTodolistAC(res.data.data.item))
//                     dispatch(setAppStatusAC('succeeded'))
//                 } else {
//                     dispatch(setAppErrorAC(res.data.messages[0]))
//                     dispatch(setAppStatusAC('failed'))
//                 }
//             })
//     }
// }
// export const changeTodolistTitleTC = (id: string, title: string) => {
//     return (dispatch: Dispatch<ActionsType>) => {
//         dispatch(setAppStatusAC('loading'))
//         todolistsAPI.updateTodolist(id, title)
//             .then((res) => {
//                 dispatch(changeTodolistTitleAC(id, title))
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//     }
// }

// types
export type SetMovieACType = ReturnType<typeof setMovieAC>;

type MovieActionsType = SetMovieACType|AppReducerType
export type GenresType = 'all'| 'Action'| 'Adventure'| 'Animation'| 'Biography'| 'Comedy'| 'Crime'| 'Documentary'|
    'Drama'| 'Family'| 'Fantasy'| 'Film Noir'| 'History'| 'Horror'| 'Music'| 'Musical'| 'Mystery'| 'Romance'|
    'Sci-Fi'| 'Short'| 'Sport'| 'Superhero'| 'Thriller'| 'War'| 'Western';
export type RatingType = 'all'|'9'| '8'| '7'| '6'| '5'| '4'| '3'| '2'|'1'|'0'
export type MovieTypeDomainType = MovieType & {
    entityStatus: RequestStatusType
}
