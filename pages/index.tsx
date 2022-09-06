import type {NextPage} from 'next'
import MainContainer from "../src/components/MainContainer";
import LandingPage from "src/components/landing/LandingPage";
import {useRouter} from "next/router";
import {useAppSelector} from "../src/utils/hooks";

const Home: NextPage = () => {
    const router = useRouter()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
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
