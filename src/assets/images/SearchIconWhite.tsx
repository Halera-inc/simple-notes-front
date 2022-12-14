import React, {SVGProps} from 'react'

export function SearchIconBlack(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width={props.width ?? "1em"}
             height={props.height ?? "1em"} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M31 31L21 21M24.3333 12.6667C24.3333 14.1988 24.0316 15.7158 23.4453 17.1313C22.859 18.5468 21.9996 19.8329 20.9162 20.9162C19.8329 21.9996 18.5468 22.859 17.1313 23.4453C15.7158 24.0316 14.1988 24.3333 12.6667 24.3333C11.1346 24.3333 9.61749 24.0316 8.20203 23.4453C6.78656 22.859 5.50044 21.9996 4.41709 20.9162C3.33374 19.8329 2.47438 18.5468 1.88807 17.1313C1.30177 15.7158 1 14.1988 1 12.6667C1 9.57247 2.22916 6.60501 4.41709 4.41709C6.60501 2.22916 9.57247 1 12.6667 1C15.7609 1 18.7283 2.22916 20.9162 4.41709C23.1042 6.60501 24.3333 9.57247 24.3333 12.6667Z"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default SearchIconBlack
