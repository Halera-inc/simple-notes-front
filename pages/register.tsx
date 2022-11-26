import MainContainer from "../src/components/MainContainer";
import {useFormik} from "formik";
import s from "../src/styles/SignIn.module.css";
import Link from "next/link";
import ArrowBackIcon from "../src/assets/images/ArrowBackIcon";
import UserIcon from "../src/assets/images/UserIcon";
import KeyIcon from "../src/assets/images/KeyIcon";
import React, {useEffect, useMemo, useState} from "react";
import countryList from "react-select-country-list";
import ListIcon from "../src/assets/images/ListIcon";
import CountryIcon from "../src/assets/images/CountryIcon";
import {useRouter} from "next/router";
import {authAPI} from "../src/api/notes-api";
import {getSession, signIn} from "next-auth/react";
import InfoIcon from "../src/assets/images/InfoIcon";
import Button from "../src/components/universalComponent/Button/Button";
import {Spinner} from "../src/components/Spinner";
import {useAppDispatch, useAppSelector} from "../src/utils/hooks";
import {setIsAppFetching} from "../src/bll/slices/appSlice";
import {useTheme} from "next-themes";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {emailRegular, passwordRegular} from "src/utils/regulars";

const Register = () => {
        const [info, setInfo] = useState(false)
        const options = useMemo(() => countryList().getData(), [])
        const loader = useAppSelector(state => state.app.isAppFetching)
        const dispatch = useAppDispatch()
        const router = useRouter()

        const {systemTheme, theme, setTheme} = useTheme();
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
            setMounted(true)
        }, [])

        const RenderUserIcon = () => {
            if (!mounted) return null;
            const currentTheme = theme === "system" ? systemTheme : theme;
            if (currentTheme === 'dark') {
                return (
                    <UserIcon width={'3em'} height={'3em'}  className="lg:w-[2.5em] lg:h-[2.5em] sb:w-[2em] sb:h-[2em]  sl:w-[1.5em] sl:h-[1.5em]" color={formik.errors.username && formik.touched.username
                        ? '#F06464'
                        : '#ffffff'}/>
                )
            } else {
                return (
                    <UserIcon width={'3em'} height={'3em'}   className="lg:w-[2.5em] lg:h-[2.5em] sb:w-[2em] sb:h-[2em]  sl:w-[1.5em] sl:h-[1.5em]" color={formik.errors.username && formik.touched.username
                        ? '#F06464'
                        : '#5590C1'}
                    />
                )
            }
        }

        const RenderListIcon = () => {
            if (!mounted) return null;
            const currentTheme = theme === "system" ? systemTheme : theme;
            if (currentTheme === 'dark') {
                return (
                    <ListIcon width={'3em'} height={'3em'}  className="lg:w-[2.5em] lg:h-[2.5em] sb:w-[2em] sb:h-[2em]  sl:w-[1.5em] sl:h-[1.5em]"
                              color={formik.errors.email && formik.touched.email
                                  ? '#F06464'
                                  : '#ffffff'}/>
                )
            } else {
                return (
                    <ListIcon width={'3em'} height={'3em'}  className="lg:w-[2.5em] lg:h-[2.5em] sb:w-[2em] sb:h-[2em]  sl:w-[1.5em] sl:h-[1.5em]"
                              color={formik.errors.email && formik.touched.email
                                  ? '#F06464'
                                  : '#5590C1'}/>
                )
            }
        }
        const RenderСountryIcon = () => {
            if (!mounted) return null;
            const currentTheme = theme === "system" ? systemTheme : theme;
            if (currentTheme === 'dark') {
                return (
                    <CountryIcon width={'3em'} height={'3em'}  className="lg:w-[2.5em] lg:h-[2.5em] sb:w-[2em] sb:h-[2em]  sl:w-[1.5em] sl:h-[1.5em]"
                                 color={formik.errors.country && formik.touched.country
                                     ? '#F06464'
                                     : '#ffffff'}/>
                )
            } else {
                return (
                    <CountryIcon width={'3em'} height={'3em'}  className="lg:w-[2.5em] lg:h-[2.5em] sb:w-[2em] sb:h-[2em]  sl:w-[1.5em] sl:h-[1.5em]"
                                 color={formik.errors.country && formik.touched.country
                                     ? '#F06464'
                                     : '#5590C1'}/>
                )
            }
        }
        const RenderPasswordIcon = () => {
            if (!mounted) return null;
            const currentTheme = theme === "system" ? systemTheme : theme;
            if (currentTheme === 'dark') {
                return (
                    <KeyIcon width={'3em'} height={'3em'}  className="lg:w-[2.5em] lg:h-[2.5em] sb:w-[2em] sb:h-[2em]  sl:w-[1.5em] sl:h-[1.5em]"
                             color={formik.errors.password && formik.touched.password
                                 ? '#F06464'
                                 : '#ffffff'}/>
                )
            } else {
                return (
                    <KeyIcon width={'3em'} height={'3em'}  className="lg:w-[2.5em] lg:h-[2.5em] sb:w-[2em] sb:h-[2em]  sl:w-[1.5em] sl:h-[1.5em]"
                             color={formik.errors.password && formik.touched.password
                                 ? '#F06464'
                                 : '#5590C1'}/>
                )
            }
        }
        const RenderPassword2Icon = () => {
            if (!mounted) return null;
            const currentTheme = theme === "system" ? systemTheme : theme;
            if (currentTheme === 'dark') {
                return (
                    <KeyIcon width={'3em'} height={'3em'}  className="lg:w-[2.5em] lg:h-[2.5em] sb:w-[2em] sb:h-[2em]  sl:w-[1.5em] sl:h-[1.5em]"
                             color={formik.errors.password2 && formik.touched.password2
                                 ? '#F06464'
                                 : '#ffffff'}/>
                )
            } else {
                return (
                    <KeyIcon width={'3em'} height={'3em'}  className="lg:w-[2.5em] lg:h-[2.5em] sb:w-[2em] sb:h-[2em]  sl:w-[1.5em] sl:h-[1.5em]"
                             color={formik.errors.password2 && formik.touched.password2
                                 ? '#F06464'
                                 : '#5590C1'}/>
                )
            }
        }

        type FormikErrorType = {
            username?: string
            email?: string
            country?: string
            password?: string
            password2?: string
        }

        const formik = useFormik({
            initialValues: {
                username: '',
                email: '',
                country: '',
                password: '',
                password2: '',
            },

            validate: (values) => {
                const errors: FormikErrorType = {};
                if (!values.username) {
                    errors.username = 'Required';
                }
                if (!values.email) {
                    errors.email = 'Required';
                } else if (!emailRegular.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                if (!values.country) {
                    errors.country = 'Required';
                }
                if (!values.password) {
                    errors.password = 'Required';
                } else if (!passwordRegular.test(values.password)) {
                    errors.password = 'Invalid password'
                }
                if (!values.password2) {
                    errors.password2 = 'Required';
                } else if (values.password !== values.password2) { //сдесь изменения
                    errors.password2 = 'Invalid password'
                }
                return errors;
            },
            onSubmit: async values => {
                dispatch(setIsAppFetching(true))
                const res: any = await authAPI.register(values.email, values.password, values.country, values.username)
                    .then(async () => {
                        const res: any = await signIn("credentials", {
                            redirect: false,
                            email: values.email,
                            password: values.password,
                            callbackUrl: `${window.location.origin}`,
                        })
                        dispatch(setIsAppFetching(false));
                        res.error ? console.log(res.error) : redirectToHome();
                        dispatch(setIsAppFetching(false));
                    })
                    .catch((error) => {
                        console.log(error);
                        dispatch(setIsAppFetching(false));
                    });
                console.log(res);
            },
        })


        const redirectToHome = () => {
            const {pathname} = router;
            if (pathname === "/register") {
                typeof window !== 'undefined' && router.push("/notes");
            }
        };

        const defferentClass = formik.errors.password2 === 'Invalid password'
        const defferentPassword2Class = formik.errors.password2 === 'Invalid password'
            ? <div className={s.errorTextInvalid}>{formik.errors.password2}</div>
            : <div className={s.errorTextRegistration}>{formik.errors.password2}</div>
        const defferentPasswordClass = formik.errors.password === 'Invalid password'
            ? <div className={s.errorTextInvalid}>{formik.errors.password}</div>
            : <div className={s.errorTextRegistration}>{formik.errors.password}</div>

        return (
            <MainContainer>
                <div className={s.singnInBlock}>
                    <div className={s.absolutly}>
                    <div className={s.wrapperCard}>
                        <div
                            className=" bg-blue dark:bg-grey  card shadow-xl rounded-none  border-solid border-[1px] border-blue-dark">
                            <div className={s.cardBody}>
                                <div className={"relative"}>
                                    <h2 className={`dark:text-white ${s.title} ${s.title2} `}> Registration</h2>
                                    <div className={s.arrowIcon}>
                                        <Link href={"/login"}>
                                            <ArrowBackIcon width={'2.5em'} height={'2.5em'}
                                                           color={'#5590C1'} className="dark:text-white sb:w-[2em] sb:h-[2em] sl:h-[1.6em] ms:mt-[5px] "/>
                                        </Link>
                                    </div>
                                </div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className={`${s.formControl} ${s.one}`}>
                                        <label className={s.label}>
                                            {RenderUserIcon()}
                                            <input type="text" id='username'
                                                   placeholder="username"
                                                   className={formik.touched.username && formik.errors.username ? s.errorInput : `${s.inputI} dark:bg-black dark:border-none`  }
                                                   {...formik.getFieldProps('username')}/>
                                        </label>
                                        {formik.touched.username && formik.errors.username ?
                                            <div
                                                className={s.errorTextRegistration}>{formik.errors.username}</div> : ''}
                                    </div>
                                    <div className={`${s.formControl} ${s.one}`}>
                                        <label className={s.label}>
                                            {RenderListIcon()}
                                            <input type="text" id='email' placeholder="email"
                                                   className={formik.touched.email && formik.errors.email ? s.errorInput : `${s.inputI} dark:bg-black dark:border-none`}
                                                   {...formik.getFieldProps('email')}/>
                                        </label>
                                        {formik.touched.email && formik.errors.email ?
                                            <div
                                                className={s.errorTextRegistration}>{formik.errors.email}</div> : ''}
                                    </div>
                                    <div className={`${s.formControl} ${s.one}`}>
                                        <label className={s.label}>
                                            {RenderСountryIcon()}
                                            {!formik.errors.country || !formik.touched.country ?
                                                <span className={`${s.arraw} dark:bg-black`}>
                                        </span> : <span className={s.arrawError}>
                                        </span>}
                                            <select id='country'
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.country}
                                                    className={formik.touched.country && formik.errors.country ? s.errorInput : `${s.inputI} dark:bg-black dark:border-none`}>
                                                <option className={s.option}  defaultValue='country'>
                                                    country
                                                </option>
                                                {options.map(m => {
                                                    return (
                                                        <option className={s.option}
                                                                key={m.value} value={m.label}>
                                                            {m.label}
                                                        </option>)
                                                })}
                                            </select>
                                        </label>
                                        {formik.touched.country && formik.errors.country &&
                                        <div className={s.errorTextRegistration}>{formik.errors.country}</div>}
                                    </div>
                                    <div className={`${s.formControl} ${s.one}`}>
                                        <label className={s.label}>
                                            {RenderPasswordIcon()}
                                            <input type="password" id='password'
                                                   placeholder="password"
                                                   className=
                                                       {formik.touched.password && formik.errors.password ? s.errorInput : `${s.inputI} dark:bg-black dark:border-none`}
                                                   {...formik.getFieldProps('password')} />
                                        </label>
                                        {formik.touched.password && formik.errors.password ? defferentPasswordClass : ''}
                                        <div className={s.infoIcon} onClick={() => setInfo(!info)}>
                                            <InfoIcon width={'2em'} height={'2em'} color='#5590C1' className={"sl:h-[1.6em]"}/>
                                        </div>
                                    </div>
                                    <div className={`${s.formControl} ${s.two}`}>
                                        <label className={s.label}>
                                            {RenderPassword2Icon()}
                                            <input type="password" id='password2'
                                                   placeholder="confirm password"
                                                   className={formik.touched.password2 && formik.errors.password2 ? s.errorInput : `${s.inputI} dark:bg-black dark:border-none`}
                                                   {...formik.getFieldProps('password2')}/>
                                        </label>
                                        {formik.touched.password2 && formik.errors.password2 ? defferentPassword2Class : " "}
                                    </div>
                                    <div className="card-actions justify-center relative">
                                        <Button className="dark:bg-black dark:text-white dark:border-white lg:mb-[20px] sm:w-[160px] sm:h-[50px] ms:w-[140px]  ms:text-[17px] ms:mb-[15px]"
                                                type={'submit'}
                                                title={'SignUp'}
                                                style={{
                                                    width: 200,
                                                    height: 60,
                                                    margin: '0 0 60px 0',
                                                    fontSize: 18,
                                                    backgroundColor: "white",
                                                }}/>
                                        {loader ? <Spinner size={'50px'} className='lg:right-[15%] lg:top-[6%] sb:right-[9%] sb:top-[2%] ms:right-[4%] ' style={{
                                                position: "absolute",
                                                right: '19%',
                                                top: "4%",
                                            }}/>
                                            : ''}
                                    </div>
                                </form>
                                <Link href={"/login"}>
                                    <p className="dark:text-white font-medium text-[15px] leading-[18px] mb-[15px] text-blue-dark cursor-pointer sl:mb-[5px]">Login</p>
                                </Link>

                            </div>
                        </div>

                    </div>
                    {info ?
                        <span
                            className={s.tooltipHover}><p>
                                        <b>The password must contain:</b>
                                        <br/>
                                        • at least 8 characters
                                        <br/>
                                        • numbers <br/>
                                        • upper and lower case</p>
                        </span>
                        :
                        <span
                            className={s.tooltip}><p>
                                        <b>The password must contain:</b>
                                        <br/>
                                        • at least 8 characters
                                        <br/>
                                        • numbers <br/>
                                        • upper and lower case</p>
                        </span>}
                    </div>
                </div>

            </MainContainer>
        );
    }
;

export default Register;

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
