import React, {useState} from 'react';
import {CSSProperties} from "styled-components";
import s from './Button.module.css'
import Link from "next/link";

type PropsType = {
    title: string
    callback?: (params: any) => void
    style?: CSSProperties | undefined
    link?: string
    icon?: JSX.Element
}

const Button = (props: PropsType) => {

    const [isHover, setIsHover] = useState<boolean>(false)

    const callback = (params: any) => {
        props.callback && props.callback(params)
    }

    const customStyles: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: '6px 15px',
        margin: 7,
        backgroundColor: '#E5F1FD',
        border: '1px solid #5590C1',
        color: '#5590C1',
        cursor: "pointer",
        transition: '0.1s ease-in-out'
    }

    const isHoveredCustomStyles: CSSProperties = {
        color: 'white',
        backgroundColor: '#5590C1',
    }

    return (
        <Link href={props.link ? props.link : ''}>
            <button className={s.button}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    style={!isHover
                        ? {...customStyles, ...props.style,}
                        : {...customStyles, ...props.style, ...isHoveredCustomStyles}}
                    onClick={callback}>
                {props.icon && <div>{props.icon}</div>}
                <div>{props.title}</div>
            </button>
        </Link>
    );
};

export default Button;


