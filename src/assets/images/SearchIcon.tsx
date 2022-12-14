import React, {SVGProps} from 'react'

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink"
             width={props.width ?? "1em"}
             height={props.height ?? "1em"}
             viewBox="0 0 20 20"
             stroke={'0.5px'}
             {...props}>
            <path fill="currentColor"
                  fillRule="evenodd"
                  d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z"
                  clipRule="evenodd"></path>
        </svg>
    )
}

export default SearchIcon
