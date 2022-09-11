import React, {SVGProps} from 'react'

export function ArrowBackIcon(props: SVGProps<SVGSVGElement>) {
    return (

        <svg height="1em" width="1em"  fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"  {...props}>
            <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M16,12a2,2,0,1,1,2-2A2,2,0,0,1,16,12Zm0-2Z"/>
            <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z"/>
            <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M16,24a2,2,0,0,1-2-2V16a2,2,0,0,1,4,0v6A2,2,0,0,1,16,24Zm0-8v0Z"/>
        </svg>

    )
}

export default ArrowBackIcon
