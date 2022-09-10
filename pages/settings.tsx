import MainContainer from "../src/components/MainContainer";
import MainBlockSettings from "../src/components/Settings/MainBlockSettings";
import s from "../src/styles/Settings.module.css";
import {useRouter} from "next/router";
import {getSession} from "next-auth/react";


const Settings = () => {
    const router = useRouter()
    return (
        <MainContainer>
            <div className={s.wrapperSettings}>
                <MainBlockSettings/>
            </div>
        </MainContainer>
    );
};

export default Settings;

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/login'
            }
        }
    }
    return {
        props: {session}
    }
}