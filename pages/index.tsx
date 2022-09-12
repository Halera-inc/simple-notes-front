import type {NextPage} from 'next'
import {useRouter} from "next/router";
import {getSession, signIn, signOut, useSession} from "next-auth/react";
import MainContainer from "../src/components/MainContainer";
import LandingPage from "../src/components/landing/LandingPage";
import {GetServerSideProps, GetServerSidePropsContext} from "next";

const Home: NextPage = () => {


    return (
        <MainContainer>
            <div className="bg-white dark:bg-black">
                <LandingPage/>
            </div>
        </MainContainer>
    )
}

export default Home

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
