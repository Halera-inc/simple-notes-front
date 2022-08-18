import React, {SVGProps} from 'react'

export function UserIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
             viewBox="0 0 20 20" {...props}>
            <path fill="currentColor" fillRule="evenodd" d="M10 9a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm-7 9a7 7 0 1 1 14 0H3Z"
                  clipRule="evenodd"></path>
        </svg>
    )
}

export default UserIcon
