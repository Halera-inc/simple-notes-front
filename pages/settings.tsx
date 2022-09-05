import MainContainer from "../src/components/MainContainer";
import MainBlockSettings from "../src/components/Settings/MainBlockSettings";
import s from "../src/styles/Settings.module.css";
import {useAppDispatch, useAppSelector} from "src/utils/hooks";
import {useEffect} from "react";
import {Me} from "src/bll/slices/authSlice";



const Settings = () => {

    return (
        <MainContainer>
            <div className={s.wrapperSettings}>
                <MainBlockSettings/>
            </div>
        </MainContainer>
    );
};

export default Settings;
