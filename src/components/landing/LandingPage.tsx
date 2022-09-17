import React from 'react';
import LandingHeader from "src/components/landing/header/LandingHeader";
import MainBlock from "src/components/landing/mainBlock/MainBlock";
import s from 'src/styles/landingStyle/LandingPage.module.css'
import Footer from "./footer/Footer";


const LandingPage = () => {
    return (
        <div className={s.landing}>
            <div>
                <LandingHeader title='Simple Notes'/>
                <MainBlock/>
            </div>
            <Footer/>
        </div>

    );
};

export default LandingPage;
