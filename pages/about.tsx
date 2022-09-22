import s from './../src/styles/About.module.css';
import MainContainer from "../src/components/MainContainer";

const About = () => {

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