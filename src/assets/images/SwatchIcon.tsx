import React, {SVGProps} from 'react'

 function SwatchIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
             viewBox="0 0 20 20" {...props}>
            <path fill="currentColor" fillRule="evenodd"
                  d="M4 2a2 2 0 0 0-2 2v11a3 3 0 1 0 6 0V4a2 2 0 0 0-2-2H4Zm1 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm5-1.757l4.9-4.9a2 2 0 0 0 0-2.828L13.485 5.1a2 2 0 0 0-2.828 0L10 5.757v8.486ZM16 18H9.071l6-6H16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2Z"
                  clipRule="evenodd"></path>
        </svg>
    )
}

export default SwatchIcon
