import React, {ReactNode} from "react";
import s from '../../styles/SidebarItem.module.css'

type PropsType = {
    icon: ReactNode
    tooltipInfo?: string
}

const SidebarItem = ({icon, tooltipInfo}: PropsType) => {
    return (
        <div className={`tooltip tooltip-right ${s.wrapper}`}
             data-tip={tooltipInfo ? tooltipInfo : 'Other'}>
            {icon}
        </div>
    )
}

export default SidebarItem;