'use client'
import LoginForm from "@/components/Forms/Login/LoginForm";
import {FC, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

const Page:FC = () => {
    const router = useRouter()
    const { data } = useSession()
    useEffect(() => {
        if(data)
            router.push('/')
    }, [data])
    return (
        <div className='container'>
            <LoginForm/>
        </div>
    )
};
export default Page;