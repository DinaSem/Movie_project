import axios from 'axios'
import {GenresType, RatingType} from "./state/movie-reducer";

const instance = axios.create({
    baseURL: 'https://yts.mx/api/v2/list_movies.json',

})

// api
export const movieAPI = {
    getMovie() {
        return instance.get<ResponseType>('/').then(res => res.data.data.movies);
    },
    getMovieWithSort() {
        // return instance.get<ResponseType>(`/?genre=${value}&sort_by=rating}`)
        return instance.get<ResponseType>(`/?genre=Horror&rating=0}`).then(res => res.data.data.movies);
        // return instance.get<ResponseType>(`/?genre=${value}&query_term=${sortValue}`).then(res => res.data.data.movies);
    },
    // createTodolist(title: string) {
    //     return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title});
    // },
    // deleteTodolist(id: string) {
    //     return instance.delete<ResponseType>(`todo-lists/${id}`);
    // },
    // updateTodolist(id: string, title: string) {
    //     return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${id}`, {title});
    // },
    // getTasks(todolistId: string) {
    //     return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    // },
    // deleteTask(todolistId: string, taskId: string) {
    //     return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    // },
    // createTask(todolistId: string, title: string) {
    //     return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title});
    // },
    // updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    //     return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    // }
}

// types
export type MovieType = {
    id: number
    year:number
    title: string
    summary: string
    medium_cover_image: string
    status_message:string
    genres:Array<GenresType>
    rating:RatingType
}
export type ResponseType={
    data:DataType
    status:string
    status_message:string
}
export type DataType={
    limit: number
    movie_count: number
    movies: MovieType[]
    page_number: number
}



// export type TodolistType = {
//     id: string
//     title: string
//     addedDate: string
//     order: number
// }
// export type ResponseType<D = {}> = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: D
// }
//
//
// export enum TaskStatuses {
//     New = 0,
//     InProgress = 1,
//     Completed = 2,
//     Draft = 3
// }
//
// export enum TaskPriorities {
//     Low = 0,
//     Middle = 1,
//     Hi = 2,
//     Urgently = 3,
//     Later = 4
// }
//
// export type TaskType = {
//     description: string
//     title: string
//     status: TaskStatuses
//     priority: TaskPriorities
//     startDate: string
//     deadline: string
//     id: string
//     todoListId: string
//     order: number
//     addedDate: string
// }
// export type UpdateTaskModelType = {
//     title: string
//     description: string
//     status: TaskStatuses
//     priority: TaskPriorities
//     startDate: string
//     deadline: string
// }
// type GetTasksResponse = {
//     error: string | null
//     totalCount: number
//     items: TaskType[]
// }
