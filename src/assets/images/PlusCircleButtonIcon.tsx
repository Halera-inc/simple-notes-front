import React, {SVGProps} from 'react'

export function HeroiconsSolidPlusCircle(props: SVGProps<SVGSVGElement>) {
    return (
        <div onClick={()=>alert('Hello')}>
        <svg width="1em" height="1em" viewBox="0 0 20 20" {...props}>
            <path fill="currentColor" fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm1-11a1 1 0 1 0-2 0v2H7a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2V7Z"
                  clipRule="evenodd">
            </path>
        </svg>
        </div>
    )
}

export default HeroiconsSolidPlusCircle
