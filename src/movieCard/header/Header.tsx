import React, {ChangeEvent, useState} from 'react';
import s from "./header.module.css";
import {useDispatch} from "react-redux";
import {searchMoviesTC} from "../state/movies-reducer";


export const Header = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onClickHandler = () => {
        dispatch(searchMoviesTC(value))
    }

    return (
        <div className={s.headerContainer}>
            <div>
                <input type="text"
                       className={s.inputsearch}
                       id={s.inputsearch}
                       onChange={onChangeHandler}
                       value={value}
                       autoFocus
                       placeholder={'Search Movies'}
                />
                <button className={s.button} onClick={onClickHandler}>Search</button>
                <label className={s.search} htmlFor="input-search"></label>
                <div><p>Вы ищете:{value}</p></div>
            </div>


        </div>
    );
};

