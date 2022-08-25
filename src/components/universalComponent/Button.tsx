import React from 'react';
import s from "src/styles/landingStyle/Header.module.css";

const Button = (props: { title: string,onChangeParams?:()=>void }) => {
    return (
        <div>
            <button className={s.button}
                    onClick={props.onChangeParams}
            >{props.title}</button>
        </div>
    );
};

export default Button;
