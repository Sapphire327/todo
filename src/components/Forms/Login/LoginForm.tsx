'use client'
import {FC, useEffect, useState} from 'react'
import {signIn, signOut, useSession} from "next-auth/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import styles from '../Form.module.scss'
import Link from "next/link";
import clsx from "clsx";
type FormValues = {
    login: string
    password: string
}

const LoginForm:FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [error,setError] = useState<string|null>()
    const { data } = useSession()
    const router = useRouter()
    useEffect(()=>{
        if(data)router.push('/')
    },[data])
    const onSubmit: SubmitHandler<FormValues> =async (data) => {
        const login = data.login
        const password =data.password
        const result = await signIn('credentials', {
            redirect: false,
            login,
            password,
        });
        if (result&&result.error) {
            setError(result.error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className='title'>Вход</h2>
            <div className={styles.formBody}>
                <p className={styles.error}>{error&&error}</p>
                <input className='input' placeholder='Логин'
                       type='text' {...register("login", {required: true})} />
                <input className='input' placeholder='Пароль'
                       type='password'  {...register("password", {required: true})} />
                <Link  href='/sign-up' className={styles.regLink}>Нет аккаунта?</Link>
                <input type="submit" className={clsx('button',styles.formBtn)} value='Войти'/>
            </div>
        </form>
    )
};
export default LoginForm;