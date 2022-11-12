import type {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next'
import MainContainer from "../src/components/MainContainer";
import LandingPage from "../src/components/landing/LandingPage";
import {getSession} from "next-auth/react";

const Home: NextPage = () => {

    return (
        <MainContainer>
            <div className="bg-white dark:bg-black">
                <LandingPage/>
            </div>
        </MainContainer>
    )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {destination: '/notes', permanent: false},
            props: {}
        }
    }
    return {
        props: {session}
    }
}
