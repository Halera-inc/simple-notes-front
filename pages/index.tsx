import type {NextPage} from 'next'
import styles from '../src/styles/Home.module.css'
import MainContainer from "../src/components/MainContainer";

const Home: NextPage = () => {
    return (
        <MainContainer>
            <div className={styles.container}>
                <h1>HOME PAGE</h1>
            </div>
        </MainContainer>
    )
}

export default Home
