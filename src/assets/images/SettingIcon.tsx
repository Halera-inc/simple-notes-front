import * as React from "react"
import {SVGProps} from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={40}
        height={40}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.725 2.925c-.95-3.9-6.5-3.9-7.45 0a3.831 3.831 0 0 1-5.715 2.37C7.13 3.205 3.204 7.13 5.295 10.56c1.35 2.215.152 5.105-2.368 5.718-3.903.947-3.903 6.5 0 7.445a3.829 3.829 0 0 1 2.368 5.718c-2.09 3.43 1.835 7.355 5.265 5.265a3.83 3.83 0 0 1 5.717 2.367c.948 3.903 6.5 3.903 7.446 0a3.832 3.832 0 0 1 5.717-2.367c3.43 2.09 7.355-1.836 5.265-5.266a3.832 3.832 0 0 1 2.368-5.717c3.903-.948 3.903-6.5 0-7.445a3.831 3.831 0 0 1-2.367-5.718c2.09-3.43-1.836-7.355-5.266-5.265a3.83 3.83 0 0 1-5.717-2.367l.002-.003ZM20 27.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
            fill="#E5E5E5"
            width="40px"
            height="40px"
        />
    </svg>
)

export default SvgComponent
