import s from './../src/styles/About.module.css';
import MainContainer from "../src/components/MainContainer";
import {useRouter} from "next/router";
import {useAppSelector} from "../src/utils/hooks";

const About = () => {

    const router = useRouter()

    return (
        <MainContainer>
            <div>
                <div className={s.title}>About me</div>
                <div className={s.text}></div>
            </div>
        </MainContainer>
    );
};

export default About;