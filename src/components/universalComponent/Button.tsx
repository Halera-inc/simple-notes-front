import React from 'react';
import s from "./Button.module.css";

const Button = (props: { title: string, onChangeParams?: () => void, style?: any }) => {

    return (
        <div>
            <button className={s[props.style]}
                    onClick={props.onChangeParams}
            >{props.title}</button>
        </div>
    );
};

export default Button;
