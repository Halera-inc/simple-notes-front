import MainContainer from "../src/components/MainContainer";
import {useFormik} from "formik";
import s from "../src/styles/SignIn.module.css";
import Link from "next/link";
import ArrowBackIcon from "../src/assets/images/ArrowBackIcon";
import UserIcon from "../src/assets/images/UserIcon";
import KeyIcon from "../src/assets/images/KeyIcon";
import React, {useMemo} from "react";
import countryList from "react-select-country-list";
import ListIcon from "../src/assets/images/ListIcon";
import CountryIcon from "../src/assets/images/CountryIcon";
import {useAppDispatch} from "../src/utils/hooks";
import {useRouter} from "next/router";
import {authAPI} from "../src/api/notes-api";
import {signIn} from "next-auth/react";
import InfoIcon from "../src/assets/images/InfoIcon";


const Register = () => {

    const options = useMemo(() => countryList().getData(), [])
    const router = useRouter()
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
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.country) {
                errors.country = 'Required';
            }
            if (!values.password) {
                errors.password = 'Required';
                // !/^[A-Za-z0-9]{8,}$/
            } else if (!/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(values.password)) {
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
            const res: any = await authAPI.register(values.email, values.password, values.country, values.username)
                .then(async () => {
                    const res: any = await signIn("credentials", {
                        redirect: false,
                        email: values.email,
                        password: values.password,
                        callbackUrl: `${window.location.origin}`,
                    })
                    res.error ? console.log(res.error) : redirectToHome();
                })
                .catch((error) => {
                    console.log(error);
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
                <div className={s.wrapperRegistrationCard}>
                    <div className={s.cardC}>
                        <div className={s.cardBody}>
                            <div className={s.wrapperTitle}>
                                <h2 className={s.cardTitle}> Registration</h2>
                                <div className={s.arrowIcon}>
                                    <Link href={"/login"}>
                                        <ArrowBackIcon width={'2.5em'} height={'2.5em'}
                                                       color={'#5590C1'}/>
                                    </Link>
                                </div>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className={`${s.formControl} ${s.one}`}>
                                    <label className={s.label}>
                                        <UserIcon width={'3em'} height={'3em'} color=
                                            {formik.errors.username && formik.touched.username
                                                ? '#F06464'
                                                : '#5590C1'}
                                        />
                                        <input type="text" id='username'
                                               placeholder="username"
                                               className={formik.touched.username && formik.errors.username ? s.errorInput : s.inputI}
                                               {...formik.getFieldProps('username')}/>
                                    </label>
                                    {formik.touched.username && formik.errors.username ?
                                        <div
                                            className={s.errorTextRegistration}>{formik.errors.username}</div> : ''}
                                </div>

                                <div className={`${s.formControl} ${s.one}`}>
                                    <label className={s.label}>
                                        <ListIcon width={'3em'} height={'3em'}
                                                  color={formik.errors.email && formik.touched.email
                                                      ? '#F06464'
                                                      : '#5590C1'}/>
                                        <input type="text" id='email' placeholder="email"
                                               className={formik.touched.email && formik.errors.email ? s.errorInput : s.inputI}
                                               {...formik.getFieldProps('email')}/>
                                    </label>
                                    {formik.touched.email && formik.errors.email ?
                                        <div
                                            className={s.errorTextRegistration}>{formik.errors.email}</div> : ''}
                                </div>

                                <div className={`${s.formControl} ${s.one}`}>
                                    <label className={s.label}>
                                        <CountryIcon width={'3em'} height={'3em'}
                                                     color={formik.errors.country && formik.touched.country
                                                         ? '#F06464'
                                                         : '#5590C1'}/>
                                        {!formik.errors.country || !formik.touched.country ?
                                            <span className={s.array}>

                                        </span> : <span className={s.arrayError}>

                                        </span>}
                                        <select id='country'
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.country}
                                                className={formik.touched.country && formik.errors.country ? s.errorInput : s.inputI}>
                                            <option defaultValue='country'>сountry
                                            </option>
                                            {options.map(m => {
                                                return (
                                                    <option className={s.option}
                                                            key={m.value} value={m.label}>
                                                        {m.label}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </label>
                                    {formik.touched.country && formik.errors.country ?
                                        <div
                                            className={s.errorTextRegistration}>{formik.errors.country}</div> : ''}
                                </div>

                                <div className={`${s.formControl} ${s.one}`}>
                                    <label className={s.label}>
                                        <KeyIcon width={'3em'} height={'3em'}
                                                 color={formik.errors.password && formik.touched.password
                                                     ? '#F06464'
                                                     : '#5590C1'}/>

                                        <input type="password" id='password'
                                               placeholder="password"
                                               className=
                                                   {formik.touched.password && formik.errors.password ? s.errorInput : s.inputI}
                                               {...formik.getFieldProps('password')} />
                                    </label>
                                    {formik.touched.password && formik.errors.password ? defferentPasswordClass : ''}
                                </div>

                                <div className={`${s.formControl} ${s.two}`}>
                                    <label className={s.label}>
                                        <KeyIcon width={'3em'} height={'3em'}
                                                 color={formik.errors.password2 && formik.touched.password2
                                                     ? '#F06464'
                                                     : '#5590C1'}/>
                                        <input type="password" id='password2'
                                               placeholder="confirm password"
                                               className={formik.touched.password2 && formik.errors.password2 ? s.errorInput : s.inputI}
                                               {...formik.getFieldProps('password2')}/>
                                    </label>
                                    {formik.touched.password2 && formik.errors.password2 ? defferentPassword2Class : " "}
                                </div>

                                <div className="card-actions justify-center">
                                    <button type={'submit'} className={s.btnB}>SignUp
                                    </button>
                                </div>
                            </form>
                            <Link href={"/login"}>
                                <p className={s.text}>Login</p>
                            </Link>

                        </div>
                    </div>
                    <div className={s.infoIcon}>
                        <InfoIcon width={'2em'} height={'2em'} color='#5590C1'/>
                    </div>
                    <span
                        className={s.tooltip}><p>  <b>The password must contain:</b> <br/>
                    • at least 8 characters
                    <br/>
                    • numbers <br/>
                    • upper and lower case</p></span>
                </div>

            </div>
        </MainContainer>
    );
};

export default Register;