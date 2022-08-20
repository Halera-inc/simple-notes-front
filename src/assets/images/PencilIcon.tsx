import * as React from "react"
import { SVGProps } from "react"

const PencilIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke={props.stroke ? props.stroke : ''}
        strokeWidth={1.5}
        width={props.width ? props.width : ''}
        fill={props.fill ? props.fill : 'currentColor'}
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
    </svg>
)

export default PencilIcon

