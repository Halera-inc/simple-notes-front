import * as React from "react"
import { SVGProps } from "react"

const LoginIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className={props.className ? props.className : ""}
        width={props.width ? props.width : ''}
        fill={props.fill ? props.fill : ''}
        {...props}
    >
        <path
            fillRule="evenodd"
            d="M3 3a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm7.707 3.293a1 1 0 0 1 0 1.414L9.414 9H17a1 1 0 1 1 0 2H9.414l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 0z"
            clipRule="evenodd"
        />
    </svg>
)

export default LoginIcon
