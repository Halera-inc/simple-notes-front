import React, {SVGProps} from 'react'

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg className={props.className ? props.className : ""}
             widths={props.width ? props.className : ""}
             fill={props.fill ? props.fill : ''}
             viewBox="0 0 20 20" {...props}>
            <path fillRule="evenodd"
                  d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586Z">

            </path>
        </svg>
    )
}

export default MoonIcon
