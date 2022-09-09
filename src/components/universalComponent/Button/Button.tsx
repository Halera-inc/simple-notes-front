import React from 'react';
import {CSSProperties} from "styled-components";
import s from './Button.module.css'
import Link from "next/link";
import {Url} from "url";

type PropsType = {
    title: string
    callback?: (params: any) => void
    style?: CSSProperties | undefined
    link?: string
    icon?: JSX.Element
}

const Button = (props: PropsType) => {

    const callback = (params: any) => {
        props.callback && props.callback(params)
    }

    return (
        <Link href={props.link ? props.link : ''}>
            <button className={s.button}
                    style={props.style}
                    onClick={callback}>
                {props.icon && <div>{props.icon}</div>}
                <div>{props.title}</div>
            </button>
        </Link>
    );
};

export default Button;
