import * as React from "react"
import {SVGProps} from "react"
import s from "../../components/Sidebar/Sidebar.module.css";


export const MenuIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg className={s.interface_icon__style} viewBox="0 0 24 24" {...props}><path d="M21 9V6H7v3h14m0-6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14M3 19h15v2H3a2 2 0 0 1-2-2V8h2Z"></path></svg>
    )
}
