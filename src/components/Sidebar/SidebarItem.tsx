import React, {ReactNode} from "react";
import s from '../../styles/SidebarItem.module.css'

type PropsType = {
    icon: ReactNode
}

const SidebarItem = ({icon}: PropsType) => {
    return (
        <div className={s.wrapper}>
            {icon}
        </div>
    )
}

export default SidebarItem;