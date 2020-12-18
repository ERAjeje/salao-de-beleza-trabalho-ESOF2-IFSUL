import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Header.module.css'

import { useRouter } from 'next/router'


export default function Header() {
    const router = useRouter();

    let category, token;
    category = router.query.category;
    token = router.query.token;

    return (
        <div className={styles.div}  >
            <header className={styles.header}>
                <Image className={styles.image} src='/assets/images/logoBorboleta.png' alt='logo' height={50} width={50} />
                <nav className={styles.nav}>
                    {
                        category == 1
                            ?
                            <ul>
                                <li >
                                    <Link href={{
                                        pathname: '/home',
                                        query: {
                                            category: `${category}`,
                                            token: `${token}`
                                        }
                                    }} as='/home'>
                                        Home
                            </Link>
                                </li>
                                <li >
                                    <Link href={{
                                        pathname: '/users',
                                        query: {
                                            category: `${category}`,
                                            token: `${token}`
                                        }
                                    }} as='/users'>
                                        Usuários
                            </Link>
                                </li>
                                <li >
                                    <Link href={{
                                        pathname: '/clients',
                                        query: {
                                            category: `${category}`,
                                            token: `${token}`
                                        }
                                    }} as='/clients'>
                                        Clientes
                            </Link>
                                </li>
                                <li >
                                    <Link href={{
                                        pathname: '/products',
                                        query: {
                                            category: `${category}`,
                                            token: `${token}`
                                        }
                                    }} as='/products'>
                                        Produtos
                                </Link>
                                </li>
                                <li >
                                    <Link href={{
                                        pathname: '/procedures',
                                        query: {
                                            category: `${category}`,
                                            token: `${token}`
                                        }
                                    }} as='/procedures'>
                                        Procedimentos
                            </Link>
                                </li>
                            </ul>
                            :
                            <ul>
                                <li >
                                    <Link href={{
                                        pathname: '/home',
                                        query: {
                                            category: `${category}`,
                                            token: `${token}`
                                        }
                                    }} as='/home'>
                                        Home
                            </Link>
                                </li>
                                <li >
                                    <Link href={{
                                        pathname: '/historic',
                                        query: {
                                            category: `${category}`,
                                            token: `${token}`
                                        }
                                    }} as='/historic'>
                                        Histórico
                            </Link>
                                </li>
                            </ul>
                    }
                </nav>
            </header>
        </div>
    )
}
