import MainContainer from "../src/components/MainContainer";
import MainBlockSettings from "../src/components/Settings/MainBlockSettings";
import s from "../src/styles/Settings.module.css";

const Settings = () => {
    return (
        <MainContainer>
            <div className={"dark:bg-grey pt-[130px] pr-[0px] pb-[100px] pl-[140px] h-[100vh] gap-[25px] flex content-start flex-wrap"}>
            <MainBlockSettings/>
            </div>
        </MainContainer>
    );
};

export default Settings;