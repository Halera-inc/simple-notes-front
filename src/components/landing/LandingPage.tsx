import React from 'react';
import Header from "src/components/landing/header/Header";
import MainBlock from "src/components/landing/mainBlock/MainBlock";
import s from 'src/styles/landingStyle/LandingPage.module.css'
import Footer from "./footer/Footer";

const LandingPage = () => {
    return (
        <div className={s.landing}>
            <Header title='Simple Notes'/>
            <MainBlock/>
            <Footer/>
        </div>
    );
};

export default LandingPage;
