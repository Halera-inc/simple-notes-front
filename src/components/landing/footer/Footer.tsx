import React from 'react';
import s from 'src/styles/landingStyle/footer.module.css'

const Footer = () => {
    return (
        <div className={s.footer}>
            <a className="pt-20 w-96 h-20 whitespace-pre-line relative top-20"
               href={'/about'}>{'Halera Inc, 2022 © \nAll rights reserved'}</a>
        </div>
    );
};

export default Footer;
