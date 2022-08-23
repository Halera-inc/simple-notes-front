import Link from "next/link";
import React, {ReactNode} from "react";
import s from '../../styles/SidebarItem.module.css'

type PropsType = {
    icon: ReactNode
    tooltipInfo?: string
    link?: string
    active?: boolean
}

const SidebarItem = ({icon, tooltipInfo, link, active}: PropsType) => {
    return (
        <Link href={link ? link : '#'}>
            <div className={`tooltip tooltip-right ${s.wrapper} ${active ? 'bg-white' : 'none'}`}
                 data-tip={tooltipInfo ? tooltipInfo : 'Other'}>
                {icon}
            </div>
        </Link>
    )
}

export default SidebarItem;