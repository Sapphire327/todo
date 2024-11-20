'use client'
import { FC } from 'react'
import {useSignUpMutation} from "@/store/features/registration/registration";
import {SubmitHandler, useForm} from "react-hook-form";
import {UserDto} from "@/types/dto";

const Page:FC = () => {
    const [regMutate,{error,status}] = useSignUpMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<UserDto>();
    const onSubmit: SubmitHandler<UserDto> =async (data) => {
        await regMutate(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <p></p>
                    <input className='input' placeholder='Имя'
                           type='nickname' {...register("nickname", {required: true})} />
                    <input className='input' placeholder='Логин'
                           type='text' {...register("login", {required: true})} />
                    <input className='input' placeholder='Пароль'
                           type='password'  {...register("password", {required: true})} />
                    <input type="submit" value='зарегистрироваться'/>
                </div>
            </form>
        </div>
    )
};
export default Page;