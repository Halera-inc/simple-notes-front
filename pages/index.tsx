import type {NextPage} from 'next'
import MainContainer from "../src/components/MainContainer";
import LandingPage from "src/components/landing/LandingPage";

import {useRouter} from "next/router";
import {useAppSelector} from "../src/utils/hooks";

const Home: NextPage = () => {

    const router = useRouter()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    typeof window !== 'undefined' && isLoggedIn && router.push('/notes')

    return (

        <MainContainer>
            <div className="bg-white dark:bg-black">
                <LandingPage/>
            </div>
        </MainContainer>

    )
}

export default Home
