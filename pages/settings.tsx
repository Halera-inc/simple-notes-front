import MainContainer from "../src/components/MainContainer";
import MainBlockSettings from "../src/components/Settings/MainBlockSettings";
import s from "../src/styles/Settings.module.css";
import MyNotesUpperBar from "../src/components/MyNotesUpperBar";


const settings = () => {
    return (
        <MainContainer>
            <div className={s.wrapperSettings}>
            <MyNotesUpperBar title={'Setting'} nameUser={"User's name"}/>
                <MainBlockSettings/>
            </div>
        </MainContainer>
    );
};

export default settings;