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
            user:'',
            email: '',
            country:'',


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
                    <label>
                        <li>Username: <input
                            type="text"
                            placeholder="Enter UserName"
                            className={s.inf}
                            name='user'
                            //@ts-ignore
                            defaultValue={session?.user?.name}
                            onChange={formik.handleChange}
                        />
                        </li>
                    </label>
                    <label>
                        <li>Email: <input
                            disabled={true}
                            placeholder="Enter New Email"
                            className={s.inf}
                            {...formik.getFieldProps('email')}/></li>
                    </label>
                    <label>
                        <li>Country: <input
                            placeholder="Change Country"
                            className={s.inf}
                            {...formik.getFieldProps('country')}/>
                        </li>
                    </label>
                </ul>

                <Button title={'Save'} type={'submit'} className={"edit_form_button"}/>
            </div>
        </form>
    );
};

export default InputForm;
