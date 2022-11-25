import React from 'react';
import s from 'src/styles/landingStyle/MainBlock.module.css'
import SapienMainBlockIcon from "src/assets/images/SapienMainBlockIcon";
import Button from "src/components/universalComponent/Button/Button";
import ArrowBackIcon from "../../../assets/images/ArrowBackIcon";


const MainBlock = () => {

    const buttonTitle = {
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '30px',
        paddingRight: '30px',
        fontSize: '25px',
    }

    return (
        <div className={s.mainBlockContainer}>
            <div className={s.blockTitle}>
                <h1 className={'dark:text-white mb-[30px]' }>
                    <p className='text-[90px] sm:text-[80px] md:text-[70px] font-bold leading-[110px] sm:leading-[100px]'>Just.</p>
                    <p className='text-[90px] sm:text-[80px] md:text-[70px] font-bold leading-[110px] sm:leading-[100px]'>Simple.</p>
                    <p className='text-[90px] sm:text-[80px] md:text-[70px] font-bold leading-[110px] sm:leading-[100px]'>Notes.</p>

                </h1>
                <Button icon={<ArrowBackIcon style={{rotate: '180deg'}}/>}
                        style={buttonTitle}
                        title='Start now'
                        className='sm:px-[15px] sm:py-[10px] sm:text-[20px]'
                        link={'/login'}/>

            </div>
            <div className={s.imgTitle}>
                <SapienMainBlockIcon width={744} height={744} z-0/>
            </div>

        </div>

    );
};

export default MainBlock;
