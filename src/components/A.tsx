import Link from "next/link";


const A = (props: { text: string, href: string }) => {
    return (
        <Link href={props.href}>
            <a>{props.text}</a>
        </Link>
    )
}

export default A;