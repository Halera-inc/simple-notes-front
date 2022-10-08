import MainContainer from "../src/components/MainContainer";
import MainBlockSettings from "../src/components/Settings/MainBlockSettings";
import s from "../src/styles/Settings.module.css";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {getSession} from "next-auth/react";

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

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);
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