import MainContainer from "../src/components/MainContainer";
import MainBlockSettings from "../src/components/Settings/MainBlockSettings";
import s from "../src/styles/Settings.module.css";
import {useRouter} from "next/router";
import {getSession} from "next-auth/react";
import {GetServerSideProps, GetServerSidePropsContext} from "next";


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

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);
    console.log(session)
    if (!session) {
        return {
            redirect: {destination: '/login', permanent: false},
            props: {}
        }
    }
    return {
        props: {session}
    }
}