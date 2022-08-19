import React, {ChangeEvent} from 'react';
import s from "./header.module.css";

type PropsType = {

    value:string
    callBack:(value:string)=>void
}
export const Header = ({value,callBack}:PropsType) => {
const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    callBack(e.currentTarget.value)
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
                <label className={s.search} htmlFor="input-search"></label>
                <div><p>Вы ищете:{value}</p></div>
            </div>



        </div>
    );
};

