import * as React from "react"
import {SVGProps} from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={32}
        height={28}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M10 0a2 2 0 0 0 0 4h12a2 2 0 0 0 0-4H10ZM4 8a2 2 0 0 1 2-2h20a2 2 0 0 1 0 4H6a2 2 0 0 1-2-2Zm-4 8a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-8Z"
            fill="#E5F1FD"
        />
    </svg>
)

export default SvgComponent
