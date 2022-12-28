import MainContainer from "../src/components/MainContainer";
import MainBlockSettings from "../src/components/Settings/MainBlockSettings";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {getSession, useSession} from "next-auth/react";
import { useAppDispatch } from "src/utils/hooks";
import { useEffect } from "react";
import { setUserData } from "src/bll/slices/profileSlice";

const Settings = () => {

    const dispatch = useAppDispatch()
    const sessionData = useSession()

    useEffect(()=>{
        if (sessionData.data){
            dispatch(setUserData({userData: sessionData.data.user}))
            console.log('sessionData.data')
            console.log(sessionData.data)
        }
    },[sessionData])


    return (
        <MainContainer>
            <div className={"dark:bg-grey  dark:text-white pt-[130px] pr-[40px] pb-[0] pl-[140px] h-[100vh]"}>
            <MainBlockSettings session={sessionData.data}/>
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