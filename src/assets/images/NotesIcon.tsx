import * as React from "react"
import { SVGProps } from "react"

const NotesIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className={props.className ? props.className : ""}
        width={props.width ? props.width : ''}
        fill={props.fill ? props.fill : ''}
        {...props}
    >
        <path d="M7 3a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H7zM4 7a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm-2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4z" />
    </svg>
)

export default NotesIcon
