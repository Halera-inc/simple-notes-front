import React from 'react';
import s from 'src/styles/landingStyle/MainBlock.module.css'
import SapienMainBlockIcon from "src/assets/images/SapienMainBlockIcon";
import Button from "src/components/universalComponent/Button";


const MainBlock = () => {

    return (
        <div className={s.mainBlockContainer}>
            <div className={s.blockTitle}>
                <h1 className={s.title}>
                    Just.<br/>
                    Simple.<br/>
                    Notes.
                </h1>

                <Button
                    style={"mainBlock_button"}
                    title='Start now'
                    onChangeParams={() => alert("all right")}/>
            </div>

            <div className={s.imgTitle}>
                <SapienMainBlockIcon/>
            </div>
        </div>

    );
};

export default MainBlock;
