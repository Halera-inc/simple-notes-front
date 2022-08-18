import React, {SVGProps} from 'react'
import s from '../../components/Sidebar/Sidebar.module.css';

export function PencilAltIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
             viewBox="0 0 20 20" className={s.pencil_icon} {...props}>
            <g fill="#000000">
                <path d="M17.414 2.586a2 2 0 0 0-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 0 0 0-2.828Z"></path>
                <path fillRule="evenodd"
                      d="M2 6a2 2 0 0 1 2-2h4a1 1 0 0 1 0 2H4v10h10v-4a1 1 0 1 1 2 0v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Z"
                      clipRule="evenodd" fill="#000000"></path>
            </g>
        </svg>
    )
}

export default PencilAltIcon
