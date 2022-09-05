import type {NextPage} from 'next'
import MainContainer from "../src/components/MainContainer";
import LandingPage from "src/components/landing/LandingPage";


const Home: NextPage = () => {

    return (

        <MainContainer  >
            <div className="bg-white dark:bg-black" >
                <LandingPage/>
            </div>
        </MainContainer>

    )
}

export default Home
