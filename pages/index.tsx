import type {NextPage} from 'next'
import s from '../src/styles/Home.module.css'
import MainContainer from "../src/components/MainContainer";
import LandingPage from "src/components/landing/LandingPage";

const Home: NextPage = () => {
    return (
        <MainContainer>
            <div className={s.container}>
                <LandingPage/>
            </div>
        </MainContainer>

    )
}

export default Home
