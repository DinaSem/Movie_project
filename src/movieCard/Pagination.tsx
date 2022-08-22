import React, {useCallback} from 'react';
import s from './Pagination.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {fetchMoviesTC, setPageAC, setPageTC} from "./state/movies-reducer";

export const Pagination = React.memo(() => {
    const mov = useSelector<AppRootStateType, number>(state => state.movies.movie_count)
    const pageNum = useSelector<AppRootStateType, number>(state => state.movies.page_number)
    const dispatch = useDispatch()

    let [currentPage, setCurrentPage] = React.useState<number>(1);
        let maxPages = Math.ceil(mov / 20)
        let items = [];
        let leftSide = currentPage - 2;
        if(leftSide <= 0 ) leftSide=1;
        let rightSide = currentPage + 2;
        if(rightSide>maxPages) rightSide = maxPages;
        for (let number = leftSide ; number <= rightSide; number++) {
            items.push(
                <div key={number} className={(number === currentPage ? s.roundEffectActive : s.roundEffect)} onClick={()=>{ setCurrentPage(number)}}>
                    {number}
                </div>,
            );
        }
        const nextPage = useCallback(() => {
            if(currentPage<maxPages){
                setCurrentPage(currentPage+1)
                dispatch(setPageAC(currentPage))
            }
        },[dispatch])

        const prevPage = () => {
            if(currentPage>1){
                setCurrentPage(currentPage-1)
            }
        }

        const paginationRender = (
            <div className={s.flexContainer}>
                <div> currentPage : { currentPage } </div>

                <div className={s.paginateCtn}>
                    <div className={s.roundEffect} onClick={prevPage}> &lsaquo; </div>
                    {items}
                    <div className={s.roundEffect} onClick={nextPage}> &rsaquo; </div>
                </div>
            </div>
        );
        return (paginationRender);
    })
