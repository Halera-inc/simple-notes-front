import Link from "next/link";
import React, {ReactNode, useState} from "react";

type PropsType = {
    icon: ReactNode
    tooltipInfo?: string
    link?: string
    active?: boolean
    redActive?: boolean
    onClick?: ()=>void
    className?:string
}

const SidebarItem = ({icon, tooltipInfo, link, active, redActive, onClick,...props}: PropsType) => {


    const [hover, setHover] = useState<boolean>(false)


    return (
        <Link href={link ? link : '#'}>
            <div className={props.className}
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