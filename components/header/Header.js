import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Header.module.css'

export default function Header() {
    return (
        <div  className={styles.div}>
            <header className={styles.header}>
                <Image className={styles.image} src='/assets/images/logoBorboleta.png' alt='logo' height={50} width={50} />
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <Link href='/'>
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/users'>
                                <a>Usuários</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/clients'>
                                <a>Clientes</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/procedures'>
                                <a>Procedimentos</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/products'>
                                <a>Produtos</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}
