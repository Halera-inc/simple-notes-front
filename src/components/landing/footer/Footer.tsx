import React from 'react';
import s from 'src/styles/landingStyle/footer.module.css'
import Link from "next/link";

const Footer = () => {
    return (
        <div className={s.footer}>
            {/*   href={'/about'}>{'Halera Inc, 2022 © \nAll rights reserved'}</a>*/}
            <Link href={"/about"}><p className={s.text}>Halera Inc, 2022 © All rights reserved</p></Link>
        </div>
    );
};

export default Footer;
