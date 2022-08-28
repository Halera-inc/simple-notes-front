import React from 'react';
import s from "src/styles/landingStyle/Header.module.css";

const Button = (props: { title: string,onChangeParams?:()=>void ,style:any}) => {
    return (
        <div>
            <button className={s.button} style={props.style}
                    onClick={props.onChangeParams}
            >{props.title}</button>
        </div>
    );
};

export default Button;
