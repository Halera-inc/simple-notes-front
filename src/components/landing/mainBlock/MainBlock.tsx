import React from 'react';
import s from 'src/styles/landingStyle/MainBlock.module.css'
import SapienMainBlockIcon from "src/assets/images/SapienMainBlockIcon";
import Button from "src/components/universalComponent/Button/Button";
import ArrowBackIcon from "../../../assets/images/ArrowBackIcon";


const MainBlock = () => {

    const buttonTitle = {
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '37px',
        paddingRight: '37px',
        fontSize: '25px',
    }

    return (
        <div className={s.mainBlockContainer}>
            <div className={s.blockTitle}>
                <h1 className={s.title}>
                    <p>Just.</p>
                    <p>Simple.</p>
                    <p>Notes.</p>
                </h1>

                <Button icon={<ArrowBackIcon style={{rotate: '180deg'}}/>}
                        style={buttonTitle}
                        title='Start now'
                        link={'/login'}/>
            </div>
            <div className={s.imgTitle}>
                <SapienMainBlockIcon width={744} height={744} z-0/>
            </div>
        </div>

    );
};

export default MainBlock;
