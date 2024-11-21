'use client'
import { FC } from 'react'
import styles from './Header.module.scss'
import clsx from "clsx";
import Link from "next/link";
import { signOut, useSession} from "next-auth/react";

const Header:FC = () => {
    const { data } = useSession()

    return (
        <header className={styles.header}>
            <div className={clsx('container',styles.body)}>
                <Link className={styles.logo} href={'/'}>TODO</Link>
                {data&&<button className='button' onClick={()=>{signOut()}}>Выйти</button>}
            </div>
        </header>
    )
};
export default Header;