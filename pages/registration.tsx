import MainContainer from "../src/components/MainContainer";
import {useFormik} from "formik";
import s from "../src/styles/SignIn.module.css";
import Link from "next/link";
import ArrowBackIcon from "../src/assets/images/ArrowBackIcon";
import UserIcon from "../src/assets/images/UserIcon";
import KeyIcon from "../src/assets/images/KeyIcon";
import React, {useState} from "react";


 const Registration = () => {
    const [isLogin,setIsLogin]=useState(true);

    type FormikErrorType = {
        username?: string
        password?: string
        password2?: string

    }
    const formik = useFormik({
    initialValues: {
        username: '',
        password: '',
        password2: '',

    },
    validate: (values) => {
        const errors: FormikErrorType = {};
        if (!values.username) {
            errors.username = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
            errors.username = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length <= 7) {
            errors.password = 'Password must be more than 7 characters...'
        }
        if (!values.password2) {
            errors.password2 = 'Required';
        } else if (values.password !== values.password2) { //сдесь изменения
            errors.password2 = 'The password and confirmation password do not match'
        }
        return errors;
    },
        onSubmit: values => {
            // dispatch(setRegistrTC(values));
            formik.resetForm();
        },
    })
    return (
        <MainContainer>
            <div className={s.wrapperCard}>
                <div className={s.cardC}>
                    <div className={s.cardBody}>
                        <div className={s.wrapperTitle}>
                            <h2 className={s.cardTitle}> Sign In</h2>
                            <div className={s.arrowIcon}>
                                <Link href={"/"}>
                                    <ArrowBackIcon width={'2.5em'} height={'2.5em'} color={'#5590C1'}/>
                                </Link>
                            </div>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={`${s.formControl} ${s.one}`}>
                                <label className={s.label}>
                                    <UserIcon width={'3em'} height={'3em'} color={isLogin ?'#5590C1':'#F06464'}/>
                                    <input type="text" id='username' placeholder="username"
                                           className={isLogin ? s.inputI: s.errorInput}
                                           {...formik.getFieldProps('username')}/>
                                </label>
                                {formik.touched.username && formik.errors.username}

                            </div>

                            <div className={`${s.formControl} ${s.two}`}>
                                <label className={s.label}>
                                    <KeyIcon width={'3em'} height={'3em'} color={isLogin ?'#5590C1':'#F06464'}/>
                                    <input type="text" id='password' placeholder="password"
                                           className={isLogin ? s.inputI: s.errorInput}
                                           {...formik.getFieldProps('password')}/>
                                </label>
                                {!isLogin ?
                                    <div className={s.errorText}>Incorrect login or password!</div>: null}
                            </div>

                            <div className="card-actions justify-center">
                                <button type={'submit'} className={s.btnB}>Login</button>
                            </div>
                        </form>
                        <p className={s.text}>Registration</p>
                        <p className={s.text}>Reset password</p>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default Registration;

