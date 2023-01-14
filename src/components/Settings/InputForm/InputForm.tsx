import React from 'react';
import s from "src/styles/Settings.module.css";
import Button from "src/components/universalComponent/Button/Button";
import {useAppDispatch, useAppSelector} from "src/utils/hooks";
import {updateUserData} from "src/bll/slices/profileSlice";
import {useFormik} from "formik";
import {useSession} from "next-auth/react";
import {EJSON} from "bson";
import stringify = EJSON.stringify;


const InputForm = () => {
    const dispatch = useAppDispatch()
    const {data: session} = useSession()

    const inputStyle = "h-[100%] w-[412px] bg-white dark:bg-black dark:border-none " +
        "word-break: break-all  font-thin  text-lg input  input-bordered  placeholder-current input-info  placeholder-blue-dark dark:placeholder-blue-dark rounded-none text-black dark:text-white sc:w-[300px] sc:h-[80%] sv:w-[200px] sr:w-[250px]"


    // const {register, handleSubmit} = useForm<{ username: string, email: string, country: string }>({
    //     defaultValues: {
    //         username: userData.username,
    //         email: userData.email,
    //         country: userData.country
    //     }
    // })
    //
    // const onSubmit: SubmitHandler<{ username: string, email: string, country: string }> = (values) => {
    //     dispatch(updateUserData(values))
    // }
    type FormikErrorType = {
        user?: string
        email?: string
        country?: string

    }
    const formik = useFormik({
        initialValues: {
            user: '',
            email: '',
            country: '',


        },
        onSubmit: values => {
            alert(stringify(values))
            dispatch(updateUserData(values))
        },

    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={s.edit}>
                <ul className={s.editMyProfile}>
                    <li>
                        <div className={`dark:text-white ${s.username}`}>Username:</div>
                        <input
                            type="text"
                            placeholder="Enter UserName"
                            className={inputStyle}
                            name='user'
                            //@ts-ignore
                            defaultValue={session?.user?.name}
                            onChange={formik.handleChange}
                        />
                    </li>

                    <li>
                        <div className={`dark:text-white ${s.country}`}>Country:</div>
                        <input
                            placeholder="Change Country"
                            className={inputStyle}
                            {...formik.getFieldProps('country')}/>
                    </li>
                </ul>
                <Button title={'Save'} type={'submit'}
                        className={"dark:bg-black dark:border-white dark:text-white sv:w-[140px] sv:h-[40px] sv:text-[16px] sr:mt-[30px] "}
                        style={{
                            width: 158,
                            height: 60,
                            margin: '0 0 60px 0',
                            fontSize: 25,
                        }}/>
            </div>
        </form>
    );
};

export default InputForm;
