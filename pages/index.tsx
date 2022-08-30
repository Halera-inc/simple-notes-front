import type {NextPage} from 'next'
import s from '../src/styles/Home.module.css'
import MainContainer from "../src/components/MainContainer";
import LandingPage from "src/components/landing/LandingPage";
import {useTheme} from "next-themes";

const Home: NextPage = () => {
    // const { systemTheme, theme, setTheme } = useTheme();
    //
    // // toggle responsible for changing the theme
    // const renderThemeToggle = () => {
    //     const currentTheme = theme === "system" ? systemTheme : theme;
    //     if (currentTheme === "dark") {
    //         return (
    //             <button
    //                 className='border rounded-sm p-2'
    //                 onClick={() => setTheme("light")}
    //                 type="button"
    //             > dark </button>
    //         );
    //     }
    //     return (
    //         <button
    //             className="border rounded-sm p-2"
    //             onClick={() => setTheme("dark")}
    //             type="button"
    //         > Light </button>
    //     );
    // };
    return (

        <MainContainer  >
            <div className="bg-white dark:bg-black" >
                <LandingPage/>
            </div>
        </MainContainer>

    )
}

export default Home
