import React, {useState} from 'react';
import {CSSProperties} from "styled-components";
import Link from "next/link";
import {Property} from "csstype";

type colorsButtonType = 'RED' | 'GREEN' | 'DEFAULT'
type PropsType = {
    title?: string
    callback?: (params: any) => void
    style?: CSSProperties | undefined
    link?: string
    icon?: JSX.Element
    color?: colorsButtonType
    htmlFor?: string
    className?: string
}

const Button = (props: PropsType) => {

    const [isHover, setIsHover] = useState<boolean>(false)

    const callback = (params: any) => {
        props.callback && props.callback(params)
    }

    const returnColors = (color: colorsButtonType) => {
        if (color === 'RED') {
            return {
                border: 'var(--red)',
                backgroundColor: 'var(--red-light)',
                color: 'var(--red)',
            }
        }
        if (color === 'GREEN') {
            return {
                border: 'var(--green-dark)',
                backgroundColor: 'var(--green)',
                color: 'var(--green-dark)',
            }
        } else return {
            border: 'var(--blue-dark)',
            backgroundColor: 'var(--blue)',
            color: 'var(--blue-dark)',
        }
    }
    const customStyles: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: '7px 15px',
        margin: 7,
        backgroundColor: returnColors(props.color ? props.color : 'DEFAULT').backgroundColor,
        border: `1px solid ${returnColors(props.color ? props.color : 'DEFAULT').border}`,
        color: returnColors(props.color ? props.color : 'DEFAULT').color,
        cursor: "pointer",
        transition: '0.1s ease-in-out'
    }
    const isHoveredCustomStyles: CSSProperties = {
        color: returnColors(props.color ? props.color : 'DEFAULT').backgroundColor,
        backgroundColor: returnColors(props.color ? props.color : 'DEFAULT').color,
    }

    if (props.link) {
        return (
            <Link href={props.link ? props.link : ''}>
                <label id={'linkButton'} htmlFor={props.htmlFor ? props.htmlFor : ''}
                       className={props.className}
                       onClick={callback}
                       onMouseEnter={() => setIsHover(true)}
                       onMouseLeave={() => setIsHover(false)}
                       style={!isHover
                           ? {...customStyles, ...props.style,}
                           : {...customStyles, ...props.style, ...isHoveredCustomStyles}}>
                    {props.icon && <div style={{margin: '0 5px'}}>{props.icon}</div>}
                    <div style={{margin: '0 5px'}}>{props.title}</div>
                </label>
            </Link>
        )
    } else {
        return (
            <label id={'defaultButton'} htmlFor={props.htmlFor ? props.htmlFor : ''}
                   onClick={callback}
                   className={props.className}
                   onMouseEnter={() => setIsHover(true)}
                   onMouseLeave={() => setIsHover(false)}
                   style={!isHover
                       ? {...customStyles, ...props.style,}
                       : {...customStyles, ...props.style, ...isHoveredCustomStyles}}>
                {props.icon && <div style={{margin: '0 5px'}}>{props.icon}</div>}
                <div style={{margin: '0 5px'}}>{props.title}</div>
            </label>
        )
    }

};

export default Button;


