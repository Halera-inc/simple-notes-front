import MainContainer from "../src/components/MainContainer";
import MainBlockSettings from "../src/components/Settings/MainBlockSettings";
import s from "../src/styles/Settings.module.css";

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