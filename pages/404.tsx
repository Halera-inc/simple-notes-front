import MainContainer from "../src/components/MainContainer";
import {IconImageNotFound} from "../src/assets/images/IconImageNotFound";
import s from "../src/styles/NotFound404.module.css"
import Button from "../src/components/universalComponent/Button/Button";
import ArrowBackIcon from "../src/assets/images/ArrowBackIcon";
import React from "react";

const Error = () => {
    const buttonMain = {
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '30px',
        paddingRight: '30px',
        fontSize: '20px',
    }
    



    return (
        <MainContainer>
            <div className={s.content}>
                <div className={s.iconMain}>
                    <IconImageNotFound width={'80em'} height={'65em'}/>
                    <div className={s.form}>
                        <div className={s.errorNumber}>404</div>
                        <p className={s.errorText}>page not found</p>
                    </div>
                    <div className={s.btnWrapper}>
                        <Button icon={<ArrowBackIcon/>}
                                style={buttonMain}
                                className={s.btnHome}
                                title='Back Home Page'
                                link={'/'}/>
                    </div>
                </div>



            </div>
        </MainContainer>
    );
};

export default Error;