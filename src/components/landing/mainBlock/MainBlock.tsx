import React from 'react';
import s from 'src/styles/landingStyle/MainBlock.module.css'
import SapienMainBlockIcon from "src/assets/images/SapienMainBlockIcon";
import Button from "src/components/universalComponent/Button";
import Footer from "src/components/landing/footer/Footer";


const MainBlock = () => {
    return (
        <div className={s.mainBlockContainer}>
            <div className={s.mainBlock}>
                <div className={s.block}>
                    <h1 className={s.title}>{'Just.\nSimple.\nNotes.'}</h1>
                    <Button title='Start now' onChangeParams={()=>alert("all right")} />
                    <Footer/>
                </div>
                <SapienMainBlockIcon/>

            </div>

        </div>

    );
};

export default MainBlock;
