import React, {SVGProps} from 'react'

export function SearchIconBlack(props: SVGProps<SVGSVGElement>) {
    return (

        <svg width={props.width ?? "1em"}
             height={props.height ?? "1em"}
             viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"  {...props}>
            <path
                  d="M35 35L25 25M28.3333 16.6667C28.3333 18.1988 28.0316 19.7158 27.4453 21.1313C26.859
                  22.5468 25.9996 23.8329 24.9162 24.9162C23.8329 25.9996 22.5468 26.859 21.1313 27.4453C19.7158
                  28.0316 18.1988 28.3333 16.6667 28.3333C15.1346 28.3333 13.6175 28.0316 12.202 27.4453C10.7866
                  26.859 9.50044 25.9996 8.41709 24.9162C7.33374 23.8329 6.47438 22.5468 5.88807 21.1313C5.30177
                  19.7158 5 18.1988 5 16.6667C5 13.5725 6.22916 10.605 8.41709 8.41709C10.605 6.22916 13.5725 5
                  16.6667 5C19.7609 5 22.7283 6.22916 24.9162 8.41709C27.1042 10.605 28.3333 13.5725 28.3333 16.6667Z"
                  stroke="#212121" strokeWidth={"2"} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
}

export default SearchIconBlack
