import MainContainer from "../src/components/MainContainer";
import MainBlockSettings from "../src/components/Settings/MainBlockSettings";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {getSession} from "next-auth/react";

const Settings: React.FC<any> = ({session}) => {


    return (
        <MainContainer>
            <div className={"dark:bg-grey  dark:text-white pt-[130px] pr-[40px] pb-[0] pl-[140px] h-[100vh]"}>
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
        props: {...session}
    }
}