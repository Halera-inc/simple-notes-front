import Link from "next/link";
import React, {ReactNode, useState} from "react";
import s from '../../styles/SidebarItem.module.css'

type PropsType = {
    icon: ReactNode
    tooltipInfo?: string
    link?: string
    active?: boolean
    redActive?: boolean
    onClick?: ()=>void
}

const SidebarItem = ({icon, tooltipInfo, link, active, redActive, onClick}: PropsType) => {


    const [hover, setHover] = useState<boolean>(false)


    return (
        <Link href={link ? link : '#'}>
            <div className={`tooltip tooltip-right ${s.wrapper} hover:bg-white ${active ? 'bg-white ' : 'none'}`}
                 data-tip={tooltipInfo ? tooltipInfo : 'Other'}
                 onMouseEnter={() => setHover(true)}
                 onMouseLeave={() => setHover(false)}
                 style={hover && redActive ? {backgroundColor: '#ffeeee'} : {}} onClick={onClick}>
                {icon}
            </div>
        </Link>
    )
}

export default SidebarItem;