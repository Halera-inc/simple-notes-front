import Link from "next/link";


const NavItem = (props: { text: string, href: string }) => {
    return (
        <Link className={'hover:bg-red hover:text-white h-max'} href={props.href}>
            <a className={'mx-10 h-100 hover:bg-red hover:text-white'}>{props.text}</a>
        </Link>
    )
}

export default NavItem;