import s from './../src/styles/About.module.css';
import MainContainer from "../src/components/MainContainer";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {getSession} from "next-auth/react";

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