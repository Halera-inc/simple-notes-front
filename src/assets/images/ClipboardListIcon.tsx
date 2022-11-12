import React, {SVGProps} from 'react'

export function ClipboardListIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
             viewBox="0 0 20 20" {...props}>
            <g fill="currentColor">
                <path d="M9 2a1 1 0 0 0 0 2h2a1 1 0 1 0 0-2H9Z"></path>
                <path fill="#E5E5E5"
                      d="M4 5a2 2 0 0 1 2-2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm3 4a1 1 0 0 0 0 2h.01a1 1 0 1 0 0-2H7Zm3 0a1 1 0 0 0 0 2h3a1 1 0 1 0 0-2h-3Zm-3 4a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H7Zm3 0a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Z"
                      clipRule="evenodd"></path>
            </g>
        </svg>
    )
}

export default ClipboardListIcon
