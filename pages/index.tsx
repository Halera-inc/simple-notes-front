import type {NextPage} from 'next'
import {useRouter} from "next/router";
import {signIn, signOut, useSession} from "next-auth/react";
import MainContainer from "../src/components/MainContainer";
import LandingPage from "../src/components/landing/LandingPage";

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
