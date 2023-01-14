import MainContainer from "../src/components/MainContainer";
import MainBlockSettings from "../src/components/Settings/MainBlockSettings";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {getSession, useSession} from "next-auth/react";
import { useAppDispatch } from "src/utils/hooks";
import { useEffect, useRef } from "react";
import {getUserIcon, setUserData } from "src/bll/slices/profileSlice";
import { sessionDataType } from "src/api/notes-api";

const Settings = () => {

    const dispatch = useAppDispatch()
    const sessionData = useSession() as sessionDataType
    const effectRan = useRef(false)

    useEffect(() => {
        sessionData.data && !sessionData.data.user.accessToken && dispatch(getUserIcon())
    }, [sessionData])

    useEffect(()=>{
        if (sessionData.data){
            dispatch(setUserData({userData: sessionData.data.user}))
            console.log('sessionData.data')
            console.log(sessionData.data)
        }
    },[sessionData])


    return (
        <MainContainer>
            <div className={"dark:bg-grey  dark:text-white pt-[130px] pr-[40px] pb-[0] pl-[140px] min-h-[100vh] xm:pt-[100px] sv:pt-[80px]  sr:pl-[30px] sr:pb-[100px]  sl:pr-[20px] ms:pb-[70px] mmm:pr-[20px] mmm:pl-[20px]"}>
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