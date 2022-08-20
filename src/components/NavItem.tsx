import Link from "next/link";


const NavItem = (props: { text: string, href: string }) => {
    return (
        <Link href={props.href}>
            <a>{props.text}</a>
        </Link>
    )
}

export default NavItem;