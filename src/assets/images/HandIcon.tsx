import React, {SVGProps} from 'react'

export function HandIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
             viewBox="0 0 20 20" {...props}>
            <path fill="#E5E5E5" fillRule="evenodd"
                  d="M9 3a1 1 0 0 1 2 0v5.5a.5.5 0 0 0 1 0V4a1 1 0 1 1 2 0v4.5a.5.5 0 0 0 1 0V6a1 1 0 1 1 2 0v5a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v2.5a.5.5 0 0 0 1 0V4a1 1 0 0 1 2 0v4.5a.5.5 0 0 0 1 0V3Z"
                  clipRule="evenodd"></path>
        </svg>
    )
}

export default HandIcon
