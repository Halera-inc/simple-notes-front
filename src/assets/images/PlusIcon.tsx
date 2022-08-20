import * as React from "react"
import { SVGProps } from "react"

const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={props.className ? props.className : ""}
        width={props.width ? props.width : ''}
        fill={props.fill ? props.fill : ''}
        viewBox="0 0 20 20"
        {...props}
    >
        <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-11a1 1 0 1 0-2 0v2H7a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2V7z"
            clipRule="evenodd"
        />
    </svg>
)

export default PlusIcon
