import MainContainer from "../src/components/MainContainer";
import MainBlockSettings from "../src/components/Settings/MainBlockSettings";
import s from "../src/styles/Settings.module.css";
import {useRouter} from "next/router";
import {useAppSelector} from "../src/utils/hooks";


const Settings = () => {
    const router = useRouter()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    typeof window !== 'undefined' && !isLoggedIn && router.push('/')
    return (
        <MainContainer>
            <div className={s.wrapperSettings}>
                <MainBlockSettings/>
            </div>
        </MainContainer>
    );
};

export default Settings;
